
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


document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", (tab) => {

        // convert image uploaded into base64
        let file = document.querySelector('input[type=file]')['files'][0];

        // exit early if there is no file uploaded yet
        if (!file) {
            alert("Please upload an image!");
            return;
        }

        let reader = new FileReader(); // file reader to convert file to base64


        reader.onload = function () {
            const base64String = reader.result.split(',')[1];
            
            chrome.runtime.sendMessage({action: "SUBMIT", message: base64String});
        }
        reader.readAsDataURL(file);
    })
})
