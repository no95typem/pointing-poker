import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IssueImportModal } from '../containers/IssueImportModal/IssueImportModal';
import { store } from '../redux/store';
import { theme } from '../theme';

export const showIssueImportDialog = () => {
  const div = document.createElement('div');

  const removeSelf = () => {
    ReactDOM.render(<></>, div);
    div.remove();
  };

  ReactDOM.render(
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <IssueImportModal removeSelf={removeSelf} />
      </Provider>
    </ChakraProvider>,
    div,
  );

  document.body.append(div);
};
