interface RuntimeMessage {
  type:
    | 'popup-opened'
    | 'save-and-close'
    | 'isOn-changed'
    | 'ignored-domains-changed'
    | 'remove-time-changed';
  payload?: unknown;
}

const singleHour = 3600000;
let hours = 24;
let hoursInMilliseconds = hours * singleHour;
console.log({ hoursInMilliseconds });

const initialSavedTabs = Array.from({ length: 50 }).map((el, i) => {
  return {
    isPinned: i % 2 === 0,
    url: 'youtube.com',
    savedAt: 1693279143245,
    id: Math.random()
  };
});

const initialIgnoredDomains = Array.from({ length: 50 }).map(
  (el, i) => `www.youtube${i}.com`
);

type SavedTab = {
  isPinned: boolean;
  url: string;
  savedAt: number;
  id: number;
};

console.log('running backround script');

const CURRENT_TABS = 'abracatabraCurrentTabs';
const IS_ON = 'abracatbraIsOn';
const IGNORED_DOMAINS = 'abracatbraIgnoredDomains';
const SAVED_TABS = 'abracatabraSavedTabs';
let isOn: boolean;
let ignoredDomains: string[];
let savedTabs: SavedTab[];
let currentTabs;

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
  currentTabs = curTabs;
});

//get initial user settings if there are any
chrome.storage.local.get(IS_ON).then((res) => console.log(res));
chrome.storage.local
  .get(IGNORED_DOMAINS)
  .then((res) => console.log('ignored domains = ', res));

// TODO: remove later
chrome.storage.local.set({
  [SAVED_TABS]: initialSavedTabs
});

chrome.storage.local.get(SAVED_TABS).then((res) => {
  savedTabs = res[SAVED_TABS];
  console.log({ savedTabs });
});

ignoredDomains = initialIgnoredDomains;

chrome.runtime.onMessage.addListener(
  async (message: RuntimeMessage, sender, sendResponse) => {
    switch (message.type) {
      case 'popup-opened':
        sendResponse({ isOn, ignoredDomains, savedTabs });
        break;

      case 'save-and-close':
        saveAndCloseTab();
        break;
      case 'isOn-changed':
        chrome.storage.local.set({
          [IS_ON]: message.payload
        });
        isOn = message.payload as boolean;
        console.log({ isOn });
        break;
      case 'ignored-domains-changed':
        chrome.storage.local.set({
          [IGNORED_DOMAINS]: message.payload
        });
        ignoredDomains = message.payload as string[];
        console.log({ ignoredDomains });
        break;
      case 'remove-time-changed':
        hours = message.payload as number;
        console.log({ hours });
        break;

      default:
        console.warn('message sent with no corresponding case');
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
  // const tabs = await chrome.storage.local.get(SAVED_TABS);
  // tabs[SAVED_TABS].push({
  //   isPinned: false,
  //   url: storage[0].url,
  //   savedAt: Date.now()
  // });
  savedTabs.push({
    isPinned: false,
    url: storage[0].url,
    savedAt: Date.now(),
    id: Math.random()
  });
  chrome.storage.local.set({
    [SAVED_TABS]: savedTabs
  });
};
