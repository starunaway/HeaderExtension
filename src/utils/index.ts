import { FilterKeys, IMenu, RuleKeys, Menus, MenuKeys } from '@/constants';
import { Rule, RuleKey, RuleValueKey } from '@/shared/storages/ruleStorage';

export const getVisibleMenu = (menus: IMenu[]) => {
  return menus.filter(menu => menu.show);
};

export const getSettedRules = (rule: Rule) => {
  return RuleKeys.filter(key => {
    return !!rule[key];
  });
};

export const getSettedFilters = (rule: Rule) => {
  return FilterKeys.filter(key => {
    return !!rule[key];
  });
};

export const getRuleByKey = (key: RuleValueKey) => {
  return Menus.find(menu => {
    return menu.value === key;
  });
};

export const genEmptyRule = (key: RuleValueKey) => {};

export const genRuleId = (id: number, key: RuleValueKey) => {
  const curId = MenuKeys.findIndex(m => m === key);
  return id * 10 + curId;
};
