import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { v4 as uuid } from 'uuid';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
  ALL = 'ALL',
}

export interface Rule {
  name: string;
  ruleId: string;
  /**
   * 请求头
   */
  requestHeaders?: {
    name?: string;
    value?: string;
    comments?: string;
  }[];

  /**
   * 响应头
   */
  responseHeaders?: {
    name?: string;
    value?: string;
    comments?: string;
  }[];

  /**
   * 重定向地址
   * 将访问某个路径的请求，全部重定向到另一个路径
   */
  redirectUrl?: {
    origin?: string;
    target?: string;
    comments?: string;
  }[];

  /**
   * https://www.ruanyifeng.com/blog/2016/09/csp.html
   */
  cspHeaders?: {
    directive?: string;
    value?: string;
    comments?: string;
  }[];

  /**
   * 请求时携带的 cookie
   */
  cookies?: {
    name?: string;
    value?: string;
    comments?: string;
  }[];

  /**
   * 服务端Set-Cookie
   */
  setCookies?: {
    name?: string;
    value?: string;
    comments?: string;
  }[];

  // ---------以下是 Filters ------------
  // -------- 只有满足Filters条件才生效 --------

  /**
   * 在哪些 tab 页上生效，关闭tab 页后，自动失效
   */
  tabFilters?: {}[];
  /**
   * 在哪些 url 上生效
   */
  reqUrlFilters?: {
    url?: string;
    methods: Method[];
    comments?: string;
  }[];

  /**
   * 在哪些 domain 上生效
   */
  domainFilters?: {
    domain?: string;
    comments?: string;
  }[];

  /**
   * 在指定时间之前生效
   */
  timeFilters?: {
    time?: number;
    comments?: string;
  }[];
}

export type RuleKey = keyof Rule;

type RuleState = {
  enabled: boolean;
  rules: Rule[];
};

export type RuleStorage = BaseStorage<RuleState> & {
  toggle: () => void;
  insertRule: (rule: Rule) => void;
  deleteRule: (ruleId: string) => void;
  updateRule: (ruleId: string, ruleKey: RuleKey, value: Rule[RuleKey]) => void;
};

const storage = createStorage<RuleState>(
  'rules',
  {
    enabled: false,
    rules: [
      {
        ruleId: uuid(),
        name: '规则 1',
        requestHeaders: [
          {
            name: '',
            value: '',
          },
        ],
      },
    ],
  },
  {
    storageType: StorageType.Local,
  },
);

const ruleStorage: RuleStorage = {
  ...storage,

  toggle: () => {
    console.log('SDsd');
    storage.set(state => {
      return {
        ...state,
        enabled: !state.enabled,
      };
    });
  },
  updateRule: <K extends RuleKey>(ruleId, ruleKey: K, value: Rule[K]) => {
    storage.set(state => {
      return {
        ...state,
        rules: state.rules.map(rule => {
          if (rule.ruleId === ruleId) {
            return {
              ...rule,
              [ruleKey]: value,
            };
          }
          return rule;
        }),
      };
    });
  },

  insertRule: (rule: Rule) => {
    storage.set(state => {
      return {
        ...state,
        rules: [...state.rules, rule],
      };
    });
  },

  deleteRule: (ruleId: string) => {
    storage.set(state => {
      return {
        ...state,
        rules: state.rules.filter(rule => rule.ruleId !== ruleId),
      };
    });
  },
};

export default ruleStorage;