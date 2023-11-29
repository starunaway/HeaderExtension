import { RuleValueKey } from '../shared/storages/ruleStorage';

export type IMenu = {
  name: string;
  value: RuleValueKey;
  show: boolean;
};

export const RuleMenus: IMenu[] = [
  {
    name: 'Request Header',
    value: 'requestHeaders',
    show: true,
  },
  {
    name: 'Response Header',
    value: 'responseHeaders',
    show: false,
  },
  {
    name: 'Redirect Url',
    value: 'redirectUrl',
    show: false,
  },
  {
    name: 'CSP',
    value: 'cspHeaders',
    show: false,
  },
  {
    name: 'Cookie',
    value: 'cookies',
    show: false,
  },
  {
    name: 'Set-Cookie',
    value: 'setCookies',
    show: false,
  },
];

export const FilterMenus: IMenu[] = [
  {
    name: 'Tab Filter',
    value: 'tabFilters',
    show: false,
  },
  {
    name: 'Url Filter',
    value: 'reqUrlFilters',
    show: false,
  },
  {
    name: 'Domain Filter',
    value: 'domainFilters',
    show: false,
  },
  {
    name: 'Time Filter',
    value: 'timeFilters',
    show: false,
  },
];

export const RuleKeys = RuleMenus.map(m => m.value);
export const FilterKeys = FilterMenus.map(m => m.value);

export const Menus = [...RuleMenus, ...FilterMenus];

export const RuleFieldMap = {
  requestHeaders: ['name', 'value'],
  responseHeaders: ['name', 'value'],
  redirectUrl: ['origin', 'target'],
  cspHeaders: ['directive', 'value'],
  cookies: ['name', 'value'],
  setCookies: ['name', 'value'],
  // fixme 暂时未实现
  tabFilters: ['name', 'value'],
  reqUrlFilters: ['url', 'methods'],
  domainFilters: ['domain'],
  timeFilters: ['time'],
};
