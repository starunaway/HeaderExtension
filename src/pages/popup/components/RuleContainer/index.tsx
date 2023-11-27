import useStorage from '@root/src/shared/hooks/useStorage';
import ruleStorage from '@root/src/shared/storages/ruleStorage';
import RuleItem from './RuleItem';

const RuleContainer = () => {
  const { rules } = useStorage(ruleStorage);

  return (
    <div className="flex-1">
      {rules.map(rule => (
        <RuleItem rule={rule}></RuleItem>
      ))}
    </div>
  );
};

export default RuleContainer;
