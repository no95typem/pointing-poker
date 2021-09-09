import { OBJ_PROCESSOR } from '../../../helpers/processors/obj-processor';

class IssuePriorities {
  readonly LOW = 'LOW';

  readonly MEDIUM = 'MEDIUM';

  readonly HIGH = 'HIGH';
}

export const ISSUE_PRIORITIES = OBJ_PROCESSOR.deepFreeze(new IssuePriorities());

export type IssuePriority = keyof IssuePriorities;
