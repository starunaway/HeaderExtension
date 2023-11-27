import React from 'react';
import useStorage from '@src/shared/hooks/useStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import ruleStorage from '@src/shared/storages/ruleStorage';

import { Left, RuleContainer } from './components';

const Popup = () => {
  const rule = useStorage(ruleStorage);

  return (
    <>
      <Left></Left>
      <RuleContainer></RuleContainer>
    </>
    // <div className="App">
    //   <div className="w-120 bg-gray-200">
    //     <ToggleBtn></ToggleBtn>
    //   </div>

    //   <button
    //     onClick={() => {
    //       ruleStorage.toggle();
    //       // chrome.runtime.sendMessage({
    //       //   action: 'setHeader',
    //       //   data: {
    //       //     headerName: 'x-env',
    //       //     headerValue: 't13es1213t',
    //       //   },
    //       // });
    //     }}>
    //     Toggle theme
    //   </button>
    // </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
