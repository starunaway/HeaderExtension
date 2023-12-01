import useStorage from '@/shared/hooks/useStorage';
import ToggleBtn from '../ToggleBtn';
import ruleStorage from '@/shared/storages/ruleStorage';
import { Select } from '@chakra-ui/react';

const MenuHeader = () => {
  const { rules, activeRuleId } = useStorage(ruleStorage);

  const handleSelect = e => {
    console.log(e, e.target.value);
    ruleStorage.setActiveRuleId(e.target.value);
  };

  console.log(rules);
  return (
    <div className="h-48 flex">
      <div className=" flex items-center p-12 flex-1">
        <Select size="sm" className="select" w={200} value={activeRuleId} onChange={handleSelect}>
          {rules.map(rule => {
            return <option value={rule.id}>{rule.name}</option>;
          })}
        </Select>
      </div>

      <ToggleBtn></ToggleBtn>
    </div>
  );
};

export default MenuHeader;
