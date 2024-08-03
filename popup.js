// redirect user to correct page if user is on wrong page when clicked
const newPage = "https://www.torontomu.ca/sustainability/zero-waste/recycling-waste/waste-wizard/";

// get current active tab
chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    const currentTab = tabs[0];

    // change to waste wizard.
    if (currentTab.url !== newPage) {
        chrome.tabs.update(currentTab.id, { url: newPage }, () => {
            if (chrome.runtime.lastError) {
                console.log("error changing tab!")
            } else {
                console.log("success changing tab.")
            }
        })
    }
})