import { v4 as uuidv4 } from 'uuid';

interface RuntimeMessage {
  type:
    | 'popup-opened'
    | 'save-and-close'
    | 'isOn-changed'
    | 'ignored-domains-changed'
    | 'remove-time-changed';
  payload?: unknown;
}

// const initialSavedTabs = Array.from({ length: 50 }).map((el, i) => {
//   return {
//     isPinned: i % 2 === 0,
//     url: 'youtube.com',
//     savedAt: 1693279143245,
//     id: uuidv4()
//   };
// });

const initialIgnoredDomains = Array.from({ length: 50 }).map(
  (el, i) => `www.youtube${i}.com`
);

type CurrentTab = {
  timestamp: number;
  id: number;
};

type SavedTab = {
  isPinned: boolean;
  url: string;
  savedAt: number;
  id: string;
};

console.log('running backround script');

const CURRENT_TABS = 'abracatabraCurrentTabs';
const IS_ON = 'abracatbraIsOn';
const IGNORED_DOMAINS = 'abracatbraIgnoredDomains';
const SAVED_TABS = 'abracatabraSavedTabs';
const IDLE_TAB_TIME = 'abracatabraIdleTabTime';
let isOn: boolean;
let ignoredDomains: string[] = initialIgnoredDomains;
let savedTabs: SavedTab[];
let currentTabs: CurrentTab[];
let idleTabTime = 24;

// get all tabs on first load of chrome extesion and add them to storage with timestamp
chrome.tabs.query({}, (tabs) => {
  const curTabs: CurrentTab[] = [];
  tabs.forEach(({ id, url }) => {
    curTabs.push({ timestamp: Date.now(), id });
  });
  chrome.storage.local.set({
    [CURRENT_TABS]: curTabs
  });
  currentTabs = curTabs;
});

//get initial data if there is any
chrome.storage.local.get(IS_ON).then((res) => (isOn = res[IS_ON]));
chrome.storage.local
  .get(IGNORED_DOMAINS)
  .then((res) => console.log((ignoredDomains = res[IGNORED_DOMAINS])));
chrome.storage.local
  .get(CURRENT_TABS)
  .then((res) => (currentTabs = res[CURRENT_TABS]));
chrome.storage.local
  .get(SAVED_TABS)
  .then((res) => (savedTabs = res[SAVED_TABS]));
chrome.storage.local
  .get(IDLE_TAB_TIME)
  .then((res) => (idleTabTime = res[IDLE_TAB_TIME]));

chrome.runtime.onMessage.addListener(
  async (message: RuntimeMessage, sender, sendResponse) => {
    switch (message.type) {
      case 'popup-opened':
        sendResponse({ isOn, ignoredDomains, savedTabs, idleTabTime });
        break;

      case 'save-and-close':
        saveAndCloseTab();
        break;
      case 'isOn-changed':
        chrome.storage.local.set({
          [IS_ON]: message.payload
        });
        isOn = message.payload as boolean;
        break;
      case 'ignored-domains-changed':
        chrome.storage.local.set({
          [IGNORED_DOMAINS]: message.payload
        });
        ignoredDomains = message.payload as string[];
        break;
      case 'remove-time-changed':
        idleTabTime = message.payload as number;
        chrome.storage.local.set({ [IDLE_TAB_TIME]: message.payload });
        break;

      default:
        console.warn('message sent with no corresponding case');
        break;
    }
  }
);

const updateCurrentTabs = async (activeInfo: chrome.tabs.TabActiveInfo) => {
  const storage = await chrome.storage.local.get(CURRENT_TABS);
  const tabs = storage[CURRENT_TABS];
  console.log(tabs);
  // adds new tabs to storage if they don't exist
  if (currentTabs.every((tab) => activeInfo.tabId !== tab.id)) {
    currentTabs.push({
      timestamp: Date.now(),
      id: activeInfo.tabId
    });
  }
  chrome.storage.local.set({
    [CURRENT_TABS]: currentTabs
  });
};

chrome.tabs.onActivated.addListener(updateCurrentTabs);

// updates stored tab info when a tab is removed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const storage = await chrome.storage.local.get(CURRENT_TABS);
  const tabs = storage[CURRENT_TABS];
  currentTabs.forEach(({ id }, i) => {
    if (id === tabId) {
      currentTabs.splice(i, 1);
    }
    chrome.storage.local.set({
      [CURRENT_TABS]: currentTabs
    });
  });
});

const saveAndCloseTab = async () => {
  const storage = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  // TODO: see if this await below can be removed
  chrome.tabs.remove(storage[0].id);

  savedTabs.unshift({
    isPinned: false,
    url: storage[0].url,
    savedAt: Date.now(),
    id: uuidv4()
  });
  chrome.storage.local.set({
    [SAVED_TABS]: savedTabs
  });
};

const singleHour = 3600000;
const removeIdleTabs = () => {
  currentTabs.forEach(async ({ timestamp, id }) => {
    const now = Date.now();
    const { url } = await chrome.tabs.get(id);
    if (now - timestamp > singleHour * idleTabTime) {
      savedTabs.unshift({
        url,
        isPinned: false,
        savedAt: now,
        id: uuidv4()
      });
      chrome.tabs.remove(id);
      chrome.storage.local.set({
        [SAVED_TABS]: savedTabs
      });
    }
  });
};

setInterval(() => console.log({ currentTabs }), 1000);
