import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  IIssueModal,
  Issue,
} from '../../../../shared/types/session/issue/issue';

import IssueCardView from './IssuesCardsView';

const IssuesCards = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //! временные хуки, для визуализации. В будущем будет реализовано через стор.

  // const [id, setId] = useState('');

  //!

  const createIssue = (newId?: string): void => {
    if (newId) {
      console.log(newId);
    }

    onOpen();
  };

  const issue1: Issue = {
    id: '1',
    title: 'a',
    link: 'www.a.com',
    priority: 'MEDIUM',
    pos: 1,
    isSynced: true,
    closed: false,
  };

  const issue2: Issue = {
    ...issue1,
    id: '2',
    title: 'b',
    pos: 2,
    priority: 'LOW',
  };

  const modalData: IIssueModal = {
    onClose: onClose,
    isOpen: isOpen,
    onClick: createIssue,
  };

  return <IssueCardView issues={[issue1, issue2]} modal={modalData} />;
};

export default IssuesCards;
