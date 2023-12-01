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

export const genRuleId = rules => {
  const last = rules[rules.length - 1];
  if (last.id === rules.length) {
    return rules.length + 1;
  }

  let nextId = 1;
  for (const rule of rules) {
    if (rule.id === nextId) {
      nextId++;
    } else if (rule.id > nextId) {
      return nextId;
    }
  }
  return nextId;
};
