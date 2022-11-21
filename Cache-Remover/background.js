
let defaultSettings = {
  "websites": []
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


async function update(activeInfo) {
  t = await browser.tabs.query({active: true});
  console.log(t[0].url);
}

browser.tabs.onActivated.addListener(update);
