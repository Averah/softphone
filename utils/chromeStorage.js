export const chromeStorage = {
    setItem(key, value) {
        if (typeof chrome.storage !== 'undefined') {
            return chrome.storage.local.set({ key: value })
        } else {
            return new Promise((resolve) => resolve(localStorage.setItem(key, value)))
        }
    },
    getItem(key) {
        if (typeof chrome.storage !== 'undefined') {
            return chrome.storage.local.get([key])
        } else {
            return new Promise((resolve) => resolve(localStorage.getItem(key)))
        }
    }
}