/* eslint max-params: ["warn", 3] */
import { UNDEFINED_CARD_VALUE } from '../../const';
import { Member } from '../../types/session/member';
import { Percentage } from '../../types/session/round/round-stat';
import { ISessionGameState } from '../../types/session/state/session-state';
import { USER_ROLES } from '../../types/user/user-role';
import { USER_STATES } from '../../types/user/user-state';
import { OBJ_PROCESSOR } from '../processors/obj-processor';

export const calcPercentage = (
  votes: Record<number, string | undefined>,
): Percentage => {
  const percentage: Percentage = {};

  Object.entries(votes).forEach(([memberId, value]) => {
    const key = value || UNDEFINED_CARD_VALUE;
    const data = percentage[key];

    if (!data) {
      percentage[key] = {
        count: 1,
        ids: [+memberId],
      };
    } else {
      data.count++;
      data.ids = [...data.ids, +memberId];
    }
  });

  return percentage;
};

export const fullfillVotes = (
  members: Record<number, Member>,
  game: ISessionGameState,
  isDealerPlayer: boolean,
) => {
  const votes = OBJ_PROCESSOR.deepClone(game.votes);

  Object.entries(members).forEach(([id, m]) => {
    if (m.userRole === USER_ROLES.SPECTATOR) return;

    if (m.userRole === USER_ROLES.DEALER && !isDealerPlayer) return;

    if (
      m.userState === USER_STATES.DISCONNECTED ||
      m.userState === USER_STATES.KICKED
    )
      return;

    const key = +id;

    if (key in votes && votes[key] !== undefined) return;

    votes[key] = UNDEFINED_CARD_VALUE;
  });

  return votes;
};
