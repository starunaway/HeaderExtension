import ruleStorage, { Rule, RuleValueKey } from '@/shared/storages/ruleStorage';
import { IMenu } from '@/constants';
import { Switch, Tooltip } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, TriangleDownIcon, TriangleUpIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMemo } from 'react';

export interface IBaseRuleProps {
  ruleInfo: {
    id: string;
    rules: Rule[RuleValueKey];
    showComment?: boolean;
    enabled?: boolean;
  } & IMenu;
}

interface HeaderProps extends IBaseRuleProps {
  show: boolean;
  onShowChange: (show: boolean) => void;
}

const RuleContentHeader = (props: HeaderProps) => {
  const {
    ruleInfo: { id, rules, value: ruleKey, showComment, name, enabled },
    show,
    onShowChange,
  } = props;

  const handleRuleGrpupEnable = () => {
    const newRuleValue = rules.map(r => ({ ...r, enabled: !enabled }));

    // 每个子项都要更新状态
    ruleStorage.updateRule(id, ruleKey, newRuleValue);
    // Group 整体更新状态
    ruleStorage.updateRule(id, 'enabled', !enabled);
  };

  const handleAddRuleToGroup = () => {
    const newValue = rules || [];

    ruleStorage.updateRule(id, ruleKey, [
      ...newValue,
      {
        enabled: true,
      },
    ]);
  };

  const handleDeleteRuleGroup = () => {
    ruleStorage.updateRule(id, ruleKey, undefined);
  };

  const handleShowComment = () => {
    ruleStorage.updateRule(id, 'showComment', !showComment);
  };

  return (
    <div className="flex  items-center mb-8 justify-between">
      <div className="flex items-center">
        <Switch isChecked={enabled} mr={2} onChange={handleRuleGrpupEnable}></Switch>
        <h4 className="text-16">{name}</h4>

        {show ? (
          <TriangleDownIcon boxSize={3.5} className="iconBtn" onClick={() => onShowChange(!show)} />
        ) : (
          <TriangleUpIcon boxSize={3.5} className="iconBtn" onClick={() => onShowChange(!show)} />
        )}
      </div>

      <div className="flex">
        <Tooltip label="Add Rule">
          <AddIcon className="iconBtn" boxSize={3.5} mr={2} onClick={handleAddRuleToGroup} />
        </Tooltip>
        <Tooltip label="Delete Rule Group">
          <DeleteIcon className="iconBtn" boxSize={3.5} mr={2} onClick={handleDeleteRuleGroup} />
        </Tooltip>
        <Tooltip label="Show Comment">
          {showComment ? (
            <ViewIcon className="iconBtn" boxSize={3.5} onClick={handleShowComment} />
          ) : (
            <ViewOffIcon className="iconBtn" boxSize={3.5} onClick={handleShowComment} />
          )}
        </Tooltip>
      </div>
    </div>
  );
};

export default RuleContentHeader;
