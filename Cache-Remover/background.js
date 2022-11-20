
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
  //gettingStoredSettings.then(forget, onError);
});

browser.webRequest.onSendHeaders.addListener(() => {
  console.log("Event");
}, {urls: ["*://*/*"]})
