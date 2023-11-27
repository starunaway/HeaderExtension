import useStorage from '@/shared/hooks/useStorage';
import ToggleBtn from '../ToggleBtn';
import ruleStorage from '@/shared/storages/ruleStorage';

const MenuHeader = () => {
  const { rules } = useStorage(ruleStorage);

  console.log(rules);
  return (
    <div className="h-48 flex">
      <div className="flex-1">
        {rules.map(rule => {
          return <div>{rule.name}</div>;
        })}
      </div>
      <ToggleBtn></ToggleBtn>
    </div>
  );
};

export default MenuHeader;
