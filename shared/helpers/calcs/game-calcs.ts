import { UNDEFINED_CARD_VALUE } from '../../const';
import { Percentage } from '../../types/session/round/round-stat';

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
        membersIds: [+memberId],
      };
    } else {
      data.count++;
      data.membersIds = [...data.membersIds, +memberId];
    }
  });

  return percentage;
};
