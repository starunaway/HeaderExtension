import React, { useState } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FiFilter, FiPlusCircle } from 'react-icons/fi';
import { Rule, RuleKey } from '@/shared/storages/ruleStorage';
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

  const handleCreateRule = (menu: RuleKey) => {
    // todo add rule
  };

  return (
    <div className="flex justify-between">
      <ButtonGroup size="sm" isAttached>
        <Button onClick={() => onTabChange('rule')} colorScheme={activeTab === 'rule' ? 'teal' : 'gray'}>
          Rule
        </Button>
        <Button onClick={() => onTabChange('filter')} colorScheme={activeTab === 'filter' ? 'teal' : 'gray'}>
          Filter
        </Button>
      </ButtonGroup>

      <div>
        <Menu isLazy>
          <MenuButton as={Button} leftIcon={<AddIcon />}>
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
        {Boolean(filterMenus.length) && (
          <Menu isLazy>
            <MenuButton ml={2} as={Button} leftIcon={<AddIcon />}>
              Filter
            </MenuButton>
            <MenuList>
              {filterMenus.map(menu => {
                return <MenuItem key={menu.value}>{menu.name}</MenuItem>;
              })}
            </MenuList>
          </Menu>
        )}
      </div>

      {/* <Tabs isFitted variant="enclosed" onChange={handleTabsChange} index={activeTab === 'rule' ? 0 : 1}>
        <TabList mb="1em">
          <Tab>Rule</Tab>
          <Tab>Filter</Tab>
        </TabList>
      </Tabs> */}

      {/* <TabPanels>
        <TabPanel>
          <div className="flex justify-between">
            <Menu>
              <MenuButton as={Button} leftIcon={<AddIcon />} rightIcon={<FiPlusCircle />}>
                创建 Rule
              </MenuButton>
              <MenuList>
                List of rule attributes excluding Filter, name, and ruleId 
                <MenuItem onClick={() => handleAddAttribute('requestHeaders')}>Request Headers</MenuItem>
                 ... other menu items 
              </MenuList>
            </Menu>
            <Button leftIcon={<FiFilter />}>创建 Filter</Button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex justify-between">
            <Button leftIcon={<FiPlusCircle />}>创建 Rule</Button>
            <Menu>
              <MenuButton as={Button} leftIcon={<AddIcon />} rightIcon={<FiFilter />}>
                创建 Filter
              </MenuButton>
              <MenuList>
               List of filter attributes
                <MenuItem onClick={() => handleAddAttribute('tabFilters')}>Tab Filters</MenuItem>
                ... other menu items 
              </MenuList>
            </Menu>
          </div>
        </TabPanel>
      </TabPanels> */}
    </div>
  );
};

export default RuleHeader;
