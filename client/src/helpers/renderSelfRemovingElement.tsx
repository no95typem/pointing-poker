import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { theme } from '../theme';
import { SelfRemovingReactElement } from '../types/SelfRemoving';

export const renderSelfRemovingElement = (Elem: SelfRemovingReactElement) => {
  const div = document.createElement('div');

  const removeSelf = () => {
    ReactDOM.render(<></>, div);
    div.remove();
  };

  ReactDOM.render(
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Elem removeSelf={removeSelf} />
      </Provider>
    </ChakraProvider>,
    div,
  );

  document.body.append(div);
};
