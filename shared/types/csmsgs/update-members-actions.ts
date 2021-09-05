import { OBJ_PROCESSOR } from '../../../client/lib/processors/obj-processor';

class CSMsgUpdateMembersActions {
  readonly ADD = 'ADD';

  readonly RM = 'RM';
}

export const CSMSG_UPDATE_MEMBERS_ACTIONS = OBJ_PROCESSOR.deepFreeze(
  new CSMsgUpdateMembersActions(),
);

export type CSMsgUpdateMembersAction = keyof CSMsgUpdateMembersActions;
