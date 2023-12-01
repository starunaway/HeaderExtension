import { Input, Switch, Tooltip } from '@chakra-ui/react';
import { RuleFieldMap } from '@/constants';
import RuleContentHeader, { IBaseRuleProps } from './RuleContentHeader';
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import ruleStorage from '@/shared/storages/ruleStorage';
import RuleValue from './RuleValue';
import classnames from 'classnames';

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
    ruleStorage.updateRule(id, ruleKey, newRules);
  };

  const handleMoveUp = index => {
    if (index === 0) {
      return;
    }
    const newRules = [...rules];
    newRules.splice(index - 1, 0, newRules.splice(index, 1)[0]);
    ruleStorage.updateRule(id, ruleKey, newRules);
  };

  const handleMoveDown = index => {
    if (index === rules.length - 1) {
      return;
    }
    const newRules = [...rules];
    newRules.splice(index + 1, 0, newRules.splice(index, 1)[0]);
    ruleStorage.updateRule(id, ruleKey, newRules);
  };

  const handleDeleteRuleItem = index => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    ruleStorage.updateRule(id, ruleKey, newRules);
  };

  const handleCopyRuleItem = index => {
    const newRules = [...rules];
    newRules.splice(index + 1, 0, { ...newRules[index] });
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

              <Tooltip label="Move Up">
                <ArrowUpIcon
                  className={classnames('iconBtn', { disabled: index === 0 })}
                  boxSize={3}
                  mr={0.5}
                  onClick={() => handleMoveUp(index)}
                />
              </Tooltip>
              <Tooltip label="Move Down">
                <ArrowDownIcon
                  className={classnames('iconBtn', { disabled: index === rules.length - 1 })}
                  boxSize={3}
                  mr={0.5}
                  onClick={() => handleMoveDown(index)}
                />
              </Tooltip>
              <Tooltip label="Duplicate Rule">
                <CopyIcon className="iconBtn" boxSize={3} mr={0.5} onClick={() => handleCopyRuleItem(index)} />
              </Tooltip>
              <Tooltip label="Delete Rule">
                <DeleteIcon className="iconBtn" boxSize={3} onClick={() => handleDeleteRuleItem(index)} />
              </Tooltip>
            </div>
          );
        })}
    </div>
  );
};

export default RuleContent;
