export interface CardData {
  readonly value: string;
  readonly base64?: string;
}

export interface ICardModal {
  openModal: (id?: string) => void;
  onClose: () => void;
  isOpen: boolean;
  activeCard: CardData;
  changeCardValue: (card: CardData) => void;
  setCard: () => void;
}

export interface ICardsView {
  cards: CardData[];
  modal: ICardModal;
  units: string;
  deleteCard: (value: string) => void;
}

export interface ICardModalData {
  modal: ICardModal;
}

export interface ICardData {
  card: CardData;
  units: string;
  edit: (id?: string) => void;
  deleteCard: (value: string) => void;
}

export interface ICardsData {
  cards: CardData[];
  units: string;
  setLocalSettings: (
    name: string,
    value: string | boolean | CardData[],
  ) => void;
}
