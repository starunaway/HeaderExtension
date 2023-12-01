import { BaseStorage, createStorage, StorageType } from '@/shared/storages/base';
import { debounce } from 'lodash-es';
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
  id: number;
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
  activeRuleId: number;
  lastActiveRuleId: number;
  rules: Rule[];
};

export type RuleStorage = BaseStorage<RuleState> & {
  toggle: () => void;
  setActiveRuleId: (ruleId: number) => void;
  insertRule: (rule: Rule) => void;
  deleteRule: (ruleId: number) => void;
  updateRule: (ruleId: number, ruleKey: RuleKey, value: Rule[RuleKey]) => void;
};

const initialRuleId = 1;

export const initiatedRule: Rule = {
  id: initialRuleId,
  enabled: true,
  name: `New Rule`,
  requestHeaders: [
    {
      name: '',
      value: '',
      enabled: true,
    },
  ],
};
const storage = createStorage<RuleState>(
  'rules',
  {
    enabled: true,
    activeRuleId: initialRuleId,
    lastActiveRuleId: initialRuleId,
    rules: [initiatedRule],
  },
  {
    storageType: StorageType.Local,
  },
);

const ruleStorage: RuleStorage = {
  ...storage,

  toggle: () => {
    storage.set(state => {
      return {
        ...state,
        enabled: !state.enabled,
      };
    });
  },
  updateRule: <K extends RuleKey>(ruleId: number, ruleKey: K, value: Rule[K]) => {
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
    }, !['name'].includes(ruleKey));
  },

  insertRule: (rule: Rule) => {
    // 新建时，默认使用
    storage.set(state => {
      const lastActiveRuleId = state.activeRuleId;

      return {
        ...state,
        activeRuleId: rule.id,
        rules: [...state.rules, rule].map(r => ({ ...r, enabled: r.id === rule.id })),
        lastActiveRuleId,
      };
    });
  },

  deleteRule: (ruleId: number) => {
    storage.set(state => {
      let findIndex;
      const rules = state.rules.filter((rule, index) => {
        if (rule.id === ruleId) {
          findIndex = index;
        }
        return rule.id !== ruleId;
      });
      // 全删光了, 新增一个
      if (rules.length === 0) {
        rules.push({ ...initiatedRule, id: 1 });
      }
      const lastActiveRuleId = state.activeRuleId;

      let activeRuleId = lastActiveRuleId;
      // 如果删除的是正在使用的
      if (activeRuleId === ruleId) {
        let usedIndex = findIndex;
        while (!rules[usedIndex]) {
          usedIndex--;
        }

        activeRuleId = rules[usedIndex].id;
      }

      return {
        ...state,
        activeRuleId,
        lastActiveRuleId,
        rules: rules.map(r => ({ ...r, enabled: r.id === activeRuleId })),
      };
    });
  },
  setActiveRuleId: (ruleId: number) => {
    storage.set(state => {
      const lastActiveRuleId = state.activeRuleId;
      return {
        ...state,
        activeRuleId: ruleId,
        lastActiveRuleId,
        rules: state.rules.map(r => ({ ...r, enabled: r.id === ruleId })),
      };
    });
  },
};

const updateRule = () => {
  const { activeRuleId, rules, lastActiveRuleId, ...others } = ruleStorage.getSnapshot();
  const activeRule = rules.find(r => r.id === activeRuleId);
  chrome.runtime.sendMessage({
    action: 'setHeader',
    data: {
      ...others,
      activeRule,
      activeRuleId,
      lastActiveRuleId,
    },
  });
};

ruleStorage.subscribe(debounce(updateRule, 100));

export default ruleStorage;
