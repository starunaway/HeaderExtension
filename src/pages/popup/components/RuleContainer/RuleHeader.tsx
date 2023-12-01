import { Button, Menu, MenuButton, MenuList, MenuItem, ButtonGroup } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ruleStorage, { Rule, RuleKey, RuleValueKey } from '@/shared/storages/ruleStorage';
import { getVisibleMenu } from '@/utils';
import { FilterMenus, RuleMenus } from '@/constants';

export type ActiveTab = 'rule' | 'filter';

interface Props {
  rule: Rule;
  activeTab: ActiveTab;
  onTabChange: (activeTab: ActiveTab) => void;
}

const RuleHeader = (props: Props) => {
  const { rule, activeTab, onTabChange } = props;

  const ruleMenus = getVisibleMenu(RuleMenus);

  const filterMenus = getVisibleMenu(FilterMenus);

  const handleCreateRule = (ruleKey: RuleValueKey) => {
    // todo add rule
    onTabChange('rule');

    const newValue = rule[ruleKey] || [];

    ruleStorage.updateRule(rule.id, ruleKey, [
      ...newValue,
      {
        enabled: true,
      },
    ]);
  };

  const handleCreateFilter = (ruleKey: RuleValueKey) => {
    onTabChange('filter');

    const newValue = rule[ruleKey] || [];

    ruleStorage.updateRule(rule.id, ruleKey, [
      ...newValue,
      {
        enabled: true,
      },
    ]);
  };

  return (
    <div className="flex justify-between">
      <ButtonGroup isAttached>
        <Button onClick={() => onTabChange('rule')} colorScheme={activeTab === 'rule' ? 'teal' : 'gray'}>
          Rule
        </Button>
        <Button onClick={() => onTabChange('filter')} colorScheme={activeTab === 'filter' ? 'teal' : 'gray'}>
          Filter
        </Button>
      </ButtonGroup>

      <div className="flex items-center">
        <Menu isLazy>
          <MenuButton as={Button} leftIcon={<AddIcon boxSize={3} />} iconSpacing={0} boxSize={6} w={16} px={2}>
            Rule
          </MenuButton>
          <MenuList>
            {ruleMenus.map(menu => {
              return (
                <MenuItem onClick={() => handleCreateRule(menu.value)} key={menu.value}>
                  {menu.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        {!!filterMenus.length && (
          <Menu isLazy>
            <MenuButton ml={2} as={Button} leftIcon={<AddIcon boxSize={3} />} iconSpacing={0} boxSize={6} w={16} px={2}>
              Filter
            </MenuButton>
            <MenuList>
              {filterMenus.map(menu => {
                return (
                  <MenuItem key={menu.value} onClick={() => handleCreateFilter(menu.value)}>
                    {menu.name}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default RuleHeader;
