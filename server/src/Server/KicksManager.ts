/* eslint max-params: ["warn", 3] */

import WebSocket from 'ws';
import { DEALER_ID } from '../../../shared/const';
import { CSMsgVotekick } from '../../../shared/types/cs-msgs/msgs/player/cs-msg-votekick';
import { SCMsgForceKick } from '../../../shared/types/sc-msgs/msgs/sc-msg-force-kick';
import { SCMsgVotekick } from '../../../shared/types/sc-msgs/msgs/sc-msg-votekick';
import { SCMsgVotekickResponse } from '../../../shared/types/sc-msgs/msgs/sc-msg-votekick-response';
import { SCMsgVotekickResult } from '../../../shared/types/sc-msgs/msgs/sc-msg-votekick-result';
import { USER_ROLES } from '../../../shared/types/user/user-role';
import { USER_STATES } from '../../../shared/types/user/user-state';
import { SessionManagerAPI } from '../types';

interface IKickRec {
  startTime: number;
  expirationTime: number;
  votes: Record<number, boolean>;
  timeout: NodeJS.Timeout;
  votersThreshold: number;
}

interface IKickVotesCalc {
  votesArr: boolean[];
  accepts: number;
  declines: number;
}

export class KicksManager {
  static readonly KICK_DURATION = 30_000;

  private kicksInProcess: Record<number, IKickRec> = {};

  constructor(private api: SessionManagerAPI) {}

  private calcVotes(rec: IKickRec): IKickVotesCalc {
    const votesArr = Object.values(rec.votes);
    const accepts = votesArr.filter(vote => vote === true).length;
    const declines = votesArr.length - accepts;

    return { votesArr, accepts, declines };
  }

  private countKickers(): number {
    const { state } = this.api.getSessionState();

    return Object.values(state.members).filter(
      m =>
        m.userState === USER_STATES.CONNECTED &&
        m.userRole !== USER_ROLES.SPECTATOR,
    ).length;
  }

  handleVotekick(ws: WebSocket, id: number, msg: CSMsgVotekick): void {
    if (!this.kicksInProcess[msg.body.target] && !msg.body.isAnswer) {
      this.handleNewVotekick(ws, id, msg);
    } else {
      const rec = this.kicksInProcess[msg.body.target];

      rec.votes[id] = msg.body.decision;

      const votesCalc = this.calcVotes(rec);

      if (
        votesCalc.accepts > rec.votersThreshold ||
        votesCalc.declines > rec.votersThreshold
      ) {
        this.makeDecision(msg.body.target, votesCalc);
      }
    }
  }

  private handleNewVotekick(ws: WebSocket, id: number, msg: CSMsgVotekick) {
    const kickersCount = this.countKickers();

    if (
      kickersCount < 3 ||
      msg.body.target === DEALER_ID ||
      this.api.checkMemberState(msg.body.target) !== USER_STATES.CONNECTED
    ) {
      const rMsg = new SCMsgVotekickResponse(
        this.api.getSessionState().state.sessionId,
      );
      this.api.send(ws, JSON.stringify(rMsg));
    } else {
      this.handlePlayerVotekick({
        ws,
        initId: id,
        targetId: msg.body.target,
        kickersCount,
      });
    }
  }

  handleDealerForceKick(targetId: number) {
    const rec = this.kicksInProcess[targetId];
    const { state } = this.api.getSessionState();

    if (rec) {
      clearTimeout(rec.timeout);
      delete this.kicksInProcess[targetId];

      const msg = new SCMsgVotekickResult(state.sessionId, {
        targetId,
        result: false,
      });
      this.api.broadcast(msg, USER_ROLES.SPECTATOR);
    }

    const msg = new SCMsgForceKick(state.sessionId, targetId);
    this.api.broadcast(msg, USER_ROLES.SPECTATOR);

    this.api.kick(targetId);
  }

  private handlePlayerVotekick(params: {
    ws: WebSocket;
    initId: number;
    targetId: number;
    kickersCount: number;
  }) {
    const { ws, initId, targetId, kickersCount } = params;

    const startTime = Date.now();
    const expirationTime = startTime + KicksManager.KICK_DURATION;

    const votes: Record<number, boolean> = {};
    votes[initId] = true;

    const { state } = this.api.getSessionState();

    const targetRole = state.members[targetId]?.userRole;

    if (targetRole && targetRole !== USER_ROLES.SPECTATOR) {
      votes[targetId] = false;
    }

    const timeout = setTimeout(
      () => this.makeDecision(targetId),
      KicksManager.KICK_DURATION,
    );

    const votersThreshold = kickersCount / 2;

    this.kicksInProcess[targetId] = {
      startTime,
      expirationTime,
      votes,
      timeout,
      votersThreshold,
    };

    const rMsg = new SCMsgVotekickResponse(state.sessionId, {
      startTime,
    });
    this.api.send(ws, JSON.stringify(rMsg));

    const bMsg = new SCMsgVotekick(state.sessionId, {
      targetId,
      initId,
    });
    this.api.broadcast(bMsg, USER_ROLES.PLAYER, [initId, targetId]);
  }

  private makeDecision(targetId: number, votesCalc?: IKickVotesCalc) {
    const rec = this.kicksInProcess[targetId];

    if (rec) {
      clearTimeout(rec.timeout);

      const { accepts, declines } = votesCalc || this.calcVotes(rec);

      const result = accepts > declines;

      if (result) this.api.kick(targetId);

      const { state } = this.api.getSessionState();

      const msg = new SCMsgVotekickResult(state.sessionId, {
        targetId,
        result,
        votes: rec.votes,
      });

      this.api.broadcast(msg, USER_ROLES.SPECTATOR);

      delete this.kicksInProcess[targetId];
    }
  }
}
