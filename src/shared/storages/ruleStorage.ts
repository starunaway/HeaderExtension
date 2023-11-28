import { BaseStorage, createStorage, StorageType } from '@/shared/storages/base';
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
  id: string;
  enabled?: boolean;
  showComment?: boolean;
  /**
   * 请求头
   */
  requestHeaders?: {
    name?: string;
    value?: string;
    comments?: string;
    enabled?: boolean;
  }[];

  /**
   * 响应头
   */
  responseHeaders?: {
    name?: string;
    value?: string;
    comments?: string;
    enabled?: boolean;
  }[];

  /**
   * 重定向地址
   * 将访问某个路径的请求，全部重定向到另一个路径
   */
  redirectUrl?: {
    origin?: string;
    target?: string;
    comments?: string;
    enabled?: boolean;
  }[];

  /**
   * https://www.ruanyifeng.com/blog/2016/09/csp.html
   */
  cspHeaders?: {
    directive?: string;
    value?: string;
    comments?: string;
    enabled?: boolean;
  }[];

  /**
   * 请求时携带的 cookie
   */
  cookies?: {
    name?: string;
    value?: string;
    comments?: string;
    enabled?: boolean;
  }[];

  /**
   * 服务端Set-Cookie
   */
  setCookies?: {
    name?: string;
    value?: string;
    comments?: string;
    enabled?: boolean;
  }[];

  // ---------以下是 Filters ------------
  // -------- 只有满足Filters条件才生效 --------

  /**
   * 在哪些 tab 页上生效，关闭tab 页后，自动失效
   */
  tabFilters?: {
    comments?: string;
    enabled?: boolean;
  }[];
  /**
   * 在哪些 url 上生效
   */
  reqUrlFilters?: {
    url?: string;
    methods: Method[];
    comments?: string;
    enabled?: boolean;
  }[];

  /**
   * 在哪些 domain 上生效
   */
  domainFilters?: {
    domain?: string;
    comments?: string;
    enabled?: boolean;
  }[];

  /**
   * 在指定时间之前生效
   */
  timeFilters?: {
    time?: number;
    comments?: string;
    enabled?: boolean;
  }[];
}

export type RuleKey = keyof Rule;
export type RuleValueKey = Exclude<RuleKey, 'name' | 'id' | 'enabled' | 'showComment'>;

type RuleState = {
  enabled: boolean;
  activeRuleId: string;
  rules: Rule[];
};

export type RuleStorage = BaseStorage<RuleState> & {
  toggle: () => void;
  setActiveRuleId: (ruleId: string) => void;
  insertRule: (rule: Rule) => void;
  deleteRule: (ruleId: string) => void;
  updateRule: (ruleId: string, ruleKey: RuleKey, value: Rule[RuleKey]) => void;
};

const initialRuleId = uuid();
const storage = createStorage<RuleState>(
  'rules',
  {
    enabled: false,
    activeRuleId: initialRuleId,
    rules: [
      {
        id: initialRuleId,
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
          if (rule.id === ruleId) {
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
        rules: state.rules.filter(rule => rule.id !== ruleId),
      };
    });
  },
  setActiveRuleId: (ruleId: string) => {
    storage.set(state => {
      return {
        ...state,
        activeRuleId: ruleId,
      };
    });
  },
};

export default ruleStorage;
