interface RuntimeMessage {
  type: 'popup-opened' | 'settings-changed' | 'save-and-close';
  payload?: unknown;
}

const CURRENT_TABS = 'abracatabraCurrentTabs';
const USER_SETTINGS = 'abracatabraUserSettings';
const SAVED_TABS = 'abracatabraSavedTabs';

// get all tabs on first load of chrome extesion and add them to storage with timestamp
chrome.tabs.query({}, (tabs) => {
  const curTabs = {};
  tabs.forEach(({ id, url }) => {
    Object.assign(curTabs, { [id]: { url, timestamp: Date.now() } });
  });
  console.log(curTabs, typeof curTabs);
  chrome.storage.local.set({
    [CURRENT_TABS]: curTabs
  });
});

//set initial user settings
chrome.storage.local.set({
  [USER_SETTINGS]: { isOn: false, ignoredDomains: [] }
});

// TODO: remove later
chrome.storage.local.set({
  [SAVED_TABS]: [
    { isPinned: true, url: 'youtube.com', savedAt: '1693279143245' },
    { isPinned: true, url: 'youtube.com', savedAt: '1693279143249' }
  ]
});

const onPopupOpened = async () => {
  const savedTabs = await chrome.storage.local.get(SAVED_TABS);
  const settings = await chrome.storage.local.get(USER_SETTINGS);
  return { settings, savedTabs };
};

chrome.runtime.onMessage.addListener(
  async (message: RuntimeMessage, sender, sendResponse) => {
    switch (message.type) {
      case 'popup-opened':
        const stuff = await onPopupOpened();
        console.log(stuff);
        sendResponse({ stuff });
        break;

      case 'save-and-close':
        saveAndCloseTab();
        break;
      case 'settings-changed':
        chrome.storage.local.set({ [USER_SETTINGS]: message.payload });
        break;

      default:
        break;
    }
  }
);

const updateCurrentTabs = async (activeInfo: chrome.tabs.TabActiveInfo) => {
  const tabString = await chrome.storage.local.get(CURRENT_TABS);
  const tabs = tabString[CURRENT_TABS];
  console.log(tabs);
  // adds new tabs to storage if they don't exist
  if (!tabs[activeInfo.tabId]) {
    const tabInfo = await chrome.tabs.get(activeInfo.tabId);
    console.log({ url: tabInfo.url });
    tabs[tabInfo.id] = {
      url: tabInfo.url,
      timestamp: Date.now()
    };
  }
  tabs[activeInfo.tabId].timestamp = Date.now();
  chrome.storage.local.set({
    [CURRENT_TABS]: tabs
  });
};

chrome.tabs.onActivated.addListener(updateCurrentTabs);

// updates stored tab info when a tab is removed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const tabString = await chrome.storage.local.get(CURRENT_TABS);
  const tabs = tabString[CURRENT_TABS];
  if (tabs.hasOwnProperty(tabId)) {
    delete tabs[tabId];
    chrome.storage.local.set({
      [CURRENT_TABS]: tabs
    });
  }
});

const saveAndCloseTab = async () => {
  const storage = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  // TODO: see if this await below can be removed
  await chrome.tabs.remove(storage[0].id);
  const tabs = await chrome.storage.local.get(SAVED_TABS);
  tabs[SAVED_TABS].push({
    isPinned: false,
    url: storage[0].url,
    savedAt: Date.now()
  });
  chrome.storage.local.set({
    [SAVED_TABS]: tabs[SAVED_TABS]
  });
};
