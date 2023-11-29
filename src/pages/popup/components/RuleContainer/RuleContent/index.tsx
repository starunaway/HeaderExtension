import { Input, Switch, Tooltip } from '@chakra-ui/react';
import { IMenu, RuleFieldMap } from '@/constants';
import RuleContentHeader, { IBaseRuleProps } from './RuleContentHeader';
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';

const RuleContent = (props: IBaseRuleProps) => {
  const {
    ruleInfo: { id, rules, showComment, value },
  } = props;

  const [showRuleContent, setShowRuleContent] = useState(true);

  const { fieldName, fieldValue } = RuleFieldMap[value];
  return (
    <div>
      <RuleContentHeader
        ruleInfo={props.ruleInfo}
        show={showRuleContent}
        onShowChange={setShowRuleContent}></RuleContentHeader>
      {showRuleContent &&
        rules.map((item, index) => {
          return (
            <div className="flex gap-2 items-center">
              <Switch mr={2}></Switch>
              <Input className="ruleInput" placeholder={fieldName}></Input>
              <Input className="ruleInput" placeholder={fieldValue}></Input>
              {showComment && <Input className="ruleInput" placeholder="comment"></Input>}

              <Tooltip label="Move Up">
                <ArrowUpIcon className="iconBtn" boxSize={3} mr={0.5} />
              </Tooltip>
              <Tooltip label="Move Down">
                <ArrowDownIcon className="iconBtn" boxSize={3} mr={0.5} />
              </Tooltip>
              <Tooltip label="Duplicate Rule">
                <CopyIcon className="iconBtn" boxSize={3} mr={0.5} />
              </Tooltip>
              <Tooltip label="Delete Rule">
                <DeleteIcon className="iconBtn" boxSize={3} />
              </Tooltip>
            </div>
          );
        })}
    </div>
  );
};

export default RuleContent;
