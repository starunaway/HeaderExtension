import { Menus, RuleFieldMap } from '@/constants';
import { Rule } from '@/shared/storages/ruleStorage';
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

let EnabledRulesets = [];

chrome.declarativeNetRequest.getDynamicRules().then(rulesets => {
  EnabledRulesets = rulesets;
});

// todo 后续区分是更新 header 还是 Filter
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'setHeader') {
    const { activeRuleId, enabled, activeRule, lastActiveRuleId } = message.data as {
      activeRuleId: number;
      lastActiveRuleId: number;
      enabled: boolean;
      activeRule: Rule;
    };
    console.log(' message.data', message.data);

    const cur = await chrome.declarativeNetRequest.getDynamicRules();
    console.log('cur rules', cur);

    // 禁用该规则
    if (enabled === false) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from(new Set([activeRuleId, lastActiveRuleId])),
      });
    } else {
      console.log('activeRuleId', activeRuleId);
      // 启用该规则
      // todo 要把之前的规则移出，这里判断了值是否存在才计算 id，可能会遗漏
      // 需要根据每个子项创建规则
      const action = Menus.reduce(
        (result, menu) => {
          const ruleItem = activeRule[menu.value];

          if (ruleItem && ruleItem.length) {
            const fileds = RuleFieldMap[menu.value];
            if (menu.value === 'requestHeaders') {
              result.requestHeaders = result.requestHeaders || [];

              (ruleItem as Rule['requestHeaders']).forEach(item => {
                if (item.enabled && fileds.every(field => item[field])) {
                  result.requestHeaders.push({
                    header: item.name,
                    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                    value: item.value,
                  });
                }
              });
            }
          }

          return result;
        },
        {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
        } as chrome.declarativeNetRequest.RuleAction,
      );

      console.log(action);

      const condition: chrome.declarativeNetRequest.RuleCondition = {};

      if (action.requestHeaders.length) {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: Array.from(new Set([activeRuleId, lastActiveRuleId])),
          addRules: [
            {
              id: activeRuleId,
              action,
              condition,
            },
          ],
        });
      } else {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: Array.from(new Set([activeRuleId, lastActiveRuleId])),
        });
      }
    }
  }
});

console.log('background loaded');
chrome.storage.local.clear(function () {
  var error = chrome.runtime.lastError;
  if (error) {
    console.error(error);
  } else {
    console.log('Storage cleared successfully.');
  }
});
