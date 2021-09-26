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
        ids: [+memberId],
      };
    } else {
      data.count++;
      data.ids = [...data.ids, +memberId];
    }
  });

  return percentage;
};
