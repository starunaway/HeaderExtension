import packageJson from './package.json' assert { type: 'json' };

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: 'Header Master',
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['storage', 'declarativeNetRequest', 'declarativeNetRequestFeedback'],
  host_permissions: ['<all_urls>'],
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-34.png',
  },

  icons: {
    128: 'icon-128.png',
  },
};

export default manifest;
