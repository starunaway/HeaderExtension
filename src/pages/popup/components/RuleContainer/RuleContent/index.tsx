import { Input, Switch, Tooltip } from '@chakra-ui/react';
import { IMenu, RuleFieldMap } from '@/constants';
import RuleContentHeader, { IBaseRuleProps } from './RuleContentHeader';
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import ruleStorage from '@/shared/storages/ruleStorage';
import RuleValue from './RuleValue';

const RuleContent = (props: IBaseRuleProps) => {
  const {
    ruleInfo: { id, rules, showComment, value: ruleKey },
  } = props;

  const [showRuleContent, setShowRuleContent] = useState(true);

  const fileds = RuleFieldMap[ruleKey];

  const handleUpdateRuleItem = (index, key, newValue) => {
    const newRules = rules.map((r, i) => {
      if (i === index) {
        return { ...r, [key]: newValue };
      }
      return r;
    });
    console.log('newRules', newRules);
    ruleStorage.updateRule(id, ruleKey, newRules);
  };

  return (
    <div>
      <RuleContentHeader
        ruleInfo={props.ruleInfo}
        show={showRuleContent}
        onShowChange={setShowRuleContent}></RuleContentHeader>
      {showRuleContent &&
        rules.map((ruleItem, index) => {
          return (
            <div className="flex gap-2 items-center">
              <Switch
                mr={2}
                isChecked={ruleItem.enabled}
                onChange={() => handleUpdateRuleItem(index, 'enabled', !ruleItem.enabled)}></Switch>
              <RuleValue
                onValueChange={(field, value) => handleUpdateRuleItem(index, field, value)}
                value={ruleItem}
                fields={fileds}
                showComment={showComment}></RuleValue>

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
