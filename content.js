// global var to grab search box and search button
let searchBox;
let searchBtn;
let uploadbtn;

function insertUploadButton() {
    const uploadButton = document.createElement('a');
    uploadButton.id = 'uploadbtn-search';
    uploadButton.href = '#';
    uploadButton.className = 'btn btn-success';
    uploadButton.textContent = 'Upload Image';

    const searchButton = document.getElementById('rCbtn-search');
    console.log('searchButton:', searchButton);

    if (searchButton) {
        searchButton.insertAdjacentElement('afterend', uploadButton);
        console.log('Upload button inserted.');
        return true;
    } else {
        console.error('Element with id "rCbtn-search" not found.');
        return false;
    }
}

// Try inserting the button immediately in case the element is already there
if (!insertUploadButton()) {
    // If the immediate attempt failed, set up a MutationObserver to watch for changes
    console.log('Setting up MutationObserver.');

    const observer = new MutationObserver((mutations, observer) => {
        if (insertUploadButton()) {
            // If the button is successfully inserted, disconnect the observer
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    searchBox = document.getElementById("row-input-0");
    searchBtn = document.getElementById("rCbtn-search");
    if (searchBox && searchBtn) {
        // searchBox.value = "cellphone";
        // searchBtn.click();
        // console.log("done!")
        mutationInstance.disconnect();
    }
})

observer.observe(document, {
    childList: true,
    subtree: true
})

// receive the message from background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResopnse) {
    searchBox.value = request.message;
    searchBtn.click();
})