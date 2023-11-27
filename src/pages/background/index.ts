import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message.action === 'setHeader') {
    const { headerName, headerValue } = message.data;
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: [
        {
          id: 1,
          priority: 1,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            requestHeaders: [
              {
                header: headerName,
                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                value: headerValue,
              },
            ],
          },
          condition: {
            // todo 生效条件
            // urlFilter: '|http*://*/*',
            // resourceTypes: ['main_frame'],
          },
        },
      ],
    });
  }
});

console.log('background loaded');
