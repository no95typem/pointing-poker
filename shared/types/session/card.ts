export interface CardData {
  readonly value: string;
  readonly base64?: string;
}

export interface IActiveCard {
  activeCard: CardData;
  changeCardValue: (card: CardData) => void;
}

export interface ICardModal extends IActiveCard {
  openModal: (id?: string) => void;
  onClose: () => void;
  isOpen: boolean;
  setCard: () => void;
}

interface ISharedCardData {
  units: string;
  isGameStage?: boolean;
}

export interface ICardsView extends ISharedCardData {
  cards: CardData[];
  modal: ICardModal;
  deleteCard: (value: string) => void;
  isGameStage?: boolean;
}

export interface ICardModalData {
  modal: ICardModal;
}

export interface ICardData {
  card: CardData;
  size?: 'xs' | 'xl';
  isUnitsHidden?: boolean;
  deleteCard?: (value: string) => void;
  edit?: (id?: string) => void;
  units: string;
  isControlShown?: boolean;
}

export interface ICardsData extends ISharedCardData {
  cards: CardData[];
  setLocalSettings: (
    name: string,
    value: string | boolean | CardData[] | string[] | number,
  ) => void;
}

export interface ICardsGame extends ISharedCardData {
  cards: CardData[];
  isPlayerDealer: boolean;
  isResultsVisible: boolean;
}
