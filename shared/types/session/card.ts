export interface CardData {
  readonly value: string;
  readonly base64?: string;
}

// Cards keys are their data.value values;
export class Card {
  constructor(private data$: CardData) {}
}
