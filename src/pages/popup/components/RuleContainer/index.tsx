import useStorage from '@/shared/hooks/useStorage';
import ruleStorage from '@/shared/storages/ruleStorage';
import RuleHeader, { ActiveTab } from './RuleHeader';
import { useState } from 'react';

const RuleContainer = () => {
  const { rules, activeRuleId } = useStorage(ruleStorage);

  const [activeTab, setActiveTab] = useState<ActiveTab>('rule');

  const activeRule = rules.find(rule => rule.id === activeRuleId);

  return (
    <div className="flex-1 p-12">
      <RuleHeader rule={activeRule} activeTab={activeTab} onTabChange={setActiveTab}></RuleHeader>
    </div>
  );
};

export default RuleContainer;
