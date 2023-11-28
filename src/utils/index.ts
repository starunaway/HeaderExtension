import { FilterKeys, IMenu, RuleKeys, Menus } from '@/constants';
import { Rule, RuleKey } from '@/shared/storages/ruleStorage';

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

export const getRuleByKey = (key: RuleKey) => {
  return Menus.find(menu => {
    return menu.value === key;
  });
};
