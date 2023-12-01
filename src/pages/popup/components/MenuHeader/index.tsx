import useStorage from '@/shared/hooks/useStorage';
import ToggleBtn from '../ToggleBtn';
import ruleStorage, { initiatedRule } from '@/shared/storages/ruleStorage';
import { Input, Select, Tooltip } from '@chakra-ui/react';
import { AddIcon, CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const MenuHeader = () => {
  const { rules, activeRuleId } = useStorage(ruleStorage);

  const handleSelect = e => {
    console.log(e, e.target.value);
    ruleStorage.setActiveRuleId(+e.target.value);
  };

  const activeRule = rules.find(rule => rule.id === activeRuleId);

  const [editable, setEditable] = useState(false);

  console.log(rules);

  const handleEditRule = () => {
    setEditable(true);
  };

  const handleEditRuleName = e => {
    setEditable(false);
    ruleStorage.updateRule(activeRuleId, 'name', e.target.value);
  };

  const handleAddRule = () => {
    const newRule = { ...initiatedRule };
    newRule.id = rules.length + 1;
    newRule.name = `New Rule ${newRule.id}`;
    console.log(' newRule.id ', newRule.id, typeof newRule.id);
    ruleStorage.insertRule(newRule);
  };
  const handleDeleteRule = () => {
    ruleStorage.deleteRule(activeRuleId);
  };
  const handleCopyRule = () => {
    const newRule = { ...activeRule };
    newRule.id = rules.length + 1;
    newRule.name = `Copy of ${newRule.name}`;
    ruleStorage.insertRule(newRule);
  };

  return (
    <div className="h-48 flex">
      <div className=" flex items-center p-12 flex-1">
        {editable ? (
          <Input
            mr={4}
            autoFocus
            size="sm"
            className="noBoxShadow"
            w={200}
            defaultValue={activeRule.name}
            onBlur={handleEditRuleName}></Input>
        ) : (
          <Select size="sm" w={200} mr={4} className="noBoxShadow" value={activeRuleId} onChange={handleSelect}>
            {rules.map(rule => {
              return <option value={rule.id}>{rule.name}</option>;
            })}
          </Select>
        )}

        <Tooltip label="Edit Rule Name">
          <EditIcon className="iconBtn" boxSize={4} mr={2} onClick={handleEditRule} />
        </Tooltip>

        <Tooltip label="Add Rule">
          <AddIcon className="iconBtn" boxSize={4} mr={2} onClick={handleAddRule} />
        </Tooltip>

        <Tooltip label="Delete Rule">
          <DeleteIcon className="iconBtn" boxSize={4} mr={2} onClick={handleDeleteRule} />
        </Tooltip>

        <Tooltip label="Duplicate Rule">
          <CopyIcon className="iconBtn" boxSize={4} onClick={handleCopyRule} />
        </Tooltip>
      </div>

      <ToggleBtn></ToggleBtn>
    </div>
  );
};

export default MenuHeader;
