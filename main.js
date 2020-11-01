//initialise the popup etc.
let collections = []
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get("collections", (val) => {
        collections = val
    })
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostContains: "" },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }])
    })
})