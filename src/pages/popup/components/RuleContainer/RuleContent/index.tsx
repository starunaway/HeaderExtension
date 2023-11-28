import { Rule, RuleKey, RuleValueKey } from '@/shared/storages/ruleStorage';
import { Input } from '@chakra-ui/react';
import { IMenu } from '@root/src/constants';
import RuleContentHeader, { IBaseRuleProps } from './RuleContentHeader';
import { useState } from 'react';

const RuleContent = (props: IBaseRuleProps) => {
  const {
    ruleInfo: { id, rules, showComment },
  } = props;

  const [showRuleContent, setShowRuleContent] = useState(true);

  return (
    <div>
      <RuleContentHeader
        ruleInfo={props.ruleInfo}
        show={showRuleContent}
        onShowChange={setShowRuleContent}></RuleContentHeader>
      {showRuleContent &&
        rules.map((item, index) => {
          return (
            <div className="flex">
              <Input size="sm"></Input>
              <Input size="sm"></Input>
              {showComment && <Input></Input>}
            </div>
          );
        })}
    </div>
  );
};

export default RuleContent;
