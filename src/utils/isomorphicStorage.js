export const chromeStorage = {
    setItem(key, value) {
        if (typeof chrome.storage !== 'undefined') {
            chrome.storage.local.set({ [key]: JSON.stringify(value) });
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    getItem(key) {
        if (typeof chrome.storage !== 'undefined') {
            return new Promise((resolve) => {
                chrome.storage.local.get([key], (result) => {
                    value = result[key] ? resolve(JSON.parse(result[key])) : resolve(undefined);
                });
            })
        } else {
            return new Promise((resolve) => resolve(JSON.parse(localStorage.getItem(key))));
        }
    }
}