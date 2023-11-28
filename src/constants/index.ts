import { RuleKey } from '../shared/storages/ruleStorage';

export type IMenu = {
  name: string;
  value: RuleKey;
  show: boolean;
};

export const RuleMenus: IMenu[] = [
  {
    name: '请求头',
    value: 'requestHeaders',
    show: true,
  },
  {
    name: '响应头',
    value: 'responseHeaders',
    show: false,
  },
  {
    name: '重定向',
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
