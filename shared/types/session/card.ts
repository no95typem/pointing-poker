import { SettingsValue } from '../settings';

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

export interface ICardsSetModal {
  onSetModalOpen: () => void;
  onSetModalClose: () => void;
  isSetModalOpen: boolean;
  setCardsSet: (cards: string) => void;
}

export interface ISharedCardData {
  units: string;
  isGameStage?: boolean;
}

export interface ICardModalData {
  modal: ICardModal;
  units?: string;
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
  setLocalSettings: (name: string, value: SettingsValue) => void;
}

export interface ICardsGame extends ISharedCardData {
  cards: CardData[];
  isPlayerDealer: boolean;
  isResultsVisible: boolean;
}

export interface ICardsGameData {
  cards: CardData[];
  units: string;
}

export interface ICardsStatistic extends ICardsGameData {
  setIssueValue: (value: string) => void;
  value?: string;
}

export interface ICardsRound extends ICardsGameData {
  selectedCardValue: string;
  pickCard: (value: string) => void;
}
