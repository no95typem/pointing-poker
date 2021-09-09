import WebSocket from 'ws';
import { genUniqIdWithCrypto } from '../../../shared/helpers/generators/node-specific';
import { CSMsgCreateSession } from '../../../shared/types/cs-msgs/cs-create-session';
import { SCMsgSessionCreated } from '../../../shared/types/sc-msgs/msgs/session-created';

export class SessionManager {
  constructor(initWS: WebSocket, initMsg: CSMsgCreateSession) {
    setTimeout(() => {
      const id = genUniqIdWithCrypto();
      const msg = new SCMsgSessionCreated(id);
      initWS.send(JSON.stringify(msg));
      console.log('response sent');
    }, 2000);
  }
}
