import useStorage from '@/shared/hooks/useStorage';
import ruleStorage, { Rule, RuleKey, RuleValueKey } from '@/shared/storages/ruleStorage';
import RuleHeader, { ActiveTab } from './RuleHeader';
import { useState } from 'react';
import { getRuleByKey, getSettedFilters, getSettedRules } from '@/utils';
import RuleContent from './RuleContent';

const RuleContainer = () => {
  const { rules, activeRuleId } = useStorage(ruleStorage);

  const [activeTab, setActiveTab] = useState<ActiveTab>('rule');

  const activeRule = rules.find(rule => rule.id === activeRuleId);

  const settedRules = getSettedRules(activeRule);
  const settedFilters = getSettedFilters(activeRule);

  const renderRules = activeTab === 'rule' ? settedRules : settedFilters;

  return (
    <div className="flex-1 p-12">
      <RuleHeader rule={activeRule} activeTab={activeTab} onTabChange={setActiveTab}></RuleHeader>
      <div className="mt-12">
        {renderRules.map(ruleKey => {
          const ruleInfo = getRuleByKey(ruleKey);
          const ruleSetting = activeRule[ruleKey] as Rule[RuleValueKey];
          const rule = {
            ...ruleInfo,
            rules: ruleSetting,
            showComment: activeRule.showComment,
            id: activeRule.id,
            enabled: activeRule.enabled,
          };
          return <RuleContent ruleInfo={rule}></RuleContent>;
        })}
      </div>
    </div>
  );
};

export default RuleContainer;
