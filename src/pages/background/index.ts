import { Menus, RuleFieldMap } from '@/constants';
import { Rule } from '@/shared/storages/ruleStorage';
import { genRuleId } from '@/utils';
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'setHeader') {
    const { activeRuleId, enabled, activeRule } = message.data as {
      activeRuleId: number;
      enabled: boolean;
      activeRule: Rule;
    };

    // 禁用该规则
    if (enabled === false) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [activeRuleId],
      });
      // 没有已启用的规则，不需要操作
      // if (EnabledRulesets.length === 0) {
      //   return;
      // } else {
      //   //  需要根据每个子项创建规则
      //   // 不需要，可以通用
      //   // const ruleIds = Menus.reduce((result, m) => {
      //   //   if (activeRule[m.value]) {
      //   //     const ruleId = genRuleId(activeRuleId, m.value);
      //   //     result.push(ruleId);
      //   //   }
      //   //   return result;
      //   // }, [] as number[]);

      //   chrome.declarativeNetRequest.updateDynamicRules({
      //     removeRuleIds: [activeRuleId],
      //   });
      // }
    } else {
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

      const condition: chrome.declarativeNetRequest.RuleCondition = {};

      if (action.requestHeaders.length) {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: [activeRuleId],
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
          removeRuleIds: [activeRuleId],
        });
      }
    }
  }
});

console.log('background loaded');
// chrome.storage.local.clear(function () {
//   var error = chrome.runtime.lastError;
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Storage cleared successfully.');
//   }
// });
