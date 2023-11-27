import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/pages/popup/index.css';
import Popup from '@/pages/popup/Popup';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

refreshOnUpdate('pages/popup');

// 创建一个新的主题对象，设置默认大小为 'sm'
const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        size: 'sm', // 设置按钮的默认大小为 'sm'
      },
    },

    Menu: {
      defaultProps: {
        size: 'sm', // 设置按钮的默认大小为 'sm'
      },
    },
    // 你可以继续为其他组件设置默认大小
  },
});
function init() {
  const appContainer = document.querySelector('#app-container');

  const root = createRoot(appContainer);
  root.render(
    <ChakraProvider theme={theme}>
      <Popup />
    </ChakraProvider>,
  );
}

init();
