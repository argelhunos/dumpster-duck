// base64 string for use in API
let base64String = "";

// function to redirect user to correct page if user is on wrong page when clicked

function checkRedirect() {
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
}

document.addEventListener("DOMContentLoaded", () => {
    checkRedirect();

    // get submit button in extension
    const submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", (tab) => {
        // another query to get the active tab for its id to send message (will be replaced soon)
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0]; 

            if (activeTab) {
                // send message to the tab
                chrome.tabs.sendMessage(activeTab.id, { message: "paper" }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log("error sending message!")
                    } else {
                        console.log("success changing tab.")
                    }
                })
            }
        })

        // convert image uploaded into base64
        // get image needed from input html item
        let file = document.querySelector('input[type=file]')['files'][0];

        // exit early if there is no file uploaded yet
        if (!file) {
            alert("Please upload an image!");
            return;
        }

        let reader = new FileReader(); // file reader to convert file to base64

        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");

            imageBase64Stringsep = base64String;

            // alert(imageBase64Stringsep); idk why we need this
            alert(base64String);
        }
        reader.readAsDataURL(file);
    })
})

