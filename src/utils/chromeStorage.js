export const chromeStorage = {
    setItem(key, value) {
        if (typeof chrome.storage !== 'undefined') {
            return chrome.storage.local.set({ key: JSON.stringify(value) })
        } else {
            return new Promise((resolve) => resolve(localStorage.setItem(key, JSON.stringify(value))))
        }
    },
    getItem(key) {
        if (typeof chrome.storage !== 'undefined') {
            return JSON.parse(chrome.storage.local.get([key]))
        } else {
            return new Promise((resolve) => resolve(JSON.parse(localStorage.getItem(key))))
        }
    }
}