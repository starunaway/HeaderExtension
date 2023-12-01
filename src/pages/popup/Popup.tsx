import withSuspense from '@/shared/hoc/withSuspense';
import withErrorBoundary from '@/shared/hoc/withErrorBoundary';

import { MenuHeader, RuleContainer } from './components';

const Popup = () => {
  return (
    <>
      <MenuHeader></MenuHeader>
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
