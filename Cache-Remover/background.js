
let defaultSettings = {
  "websites": ["soundcloud"]
};

function onError(e) {
  console.error(e);
}

function checkStoredSettings(storedSettings) {
  if (!storedSettings.websites) {
    browser.storage.local.set(defaultSettings);
  }
}

function forget() {

  console.log("Forgetting...");

  const dataTypes = {
    cache: true,
    serviceWorkers: true,
  };

  options = {
    hostnames: ["soundcloud.com"],
  };

  browser.browsingData.remove(options, dataTypes);
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

browser.browserAction.onClicked.addListener(() => {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(forget, onError);
});

async function check(query) {
  t = await browser.tabs.query(query);
  for (let i = 0; i < t.length; i++) {
    for (let j = 0; j < defaultSettings.websites.length; j++){
      if (t[i].url.includes(defaultSettings.websites[j])){
        forget();
      }
    }
  }
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status === "loading") {
    check({active: true});
  }
});

browser.tabs.onActivated.addListener((activeInfo) => {
  check({active: true});
});

browser.tabs.onRemoved.addListener((removeInfo) => {
  check({currentWindow: true});
});
