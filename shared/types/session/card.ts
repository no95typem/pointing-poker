export interface CardData {
  readonly value: string;
  readonly base64?: string;
  readonly hex?: string;
}

// Cards keys are their data.value values;
export class Card {
  constructor(private data$: CardData) {}
}

export interface ICardModal {
  onClick: (id?: string) => void;
  onClose: () => void;
  isOpen: boolean;
  editCard: CardData | undefined;
}

export interface ICardsView {
  cards: CardData[];
  modal: ICardModal;
}

export interface ICardModalData {
  card: ICardModal;
}

export interface ICardData {
  card: CardData;
  onClick: (id?: string) => void;
}
