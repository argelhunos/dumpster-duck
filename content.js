// global var to grab search box and search button
let searchBox;
let searchBtn;
let uploadbtn;

function insertUploadButton() {
    uploadbtn = document.createElement('a');
    uploadbtn.id = 'uploadbtn-search';
    uploadbtn.className = 'btn btn-success';
    uploadbtn.textContent = 'Upload Image';

    const searchButton = document.getElementById('rCbtn-search');

    if (searchButton) {
        searchButton.insertAdjacentElement('afterend', uploadbtn);
        return true;
    } else {
        return false;
    }
}

// Try inserting the button immediately in case the element is already there
if (!insertUploadButton()) {
    // If the immediate attempt failed, set up a MutationObserver to watch for changes

    const observer = new MutationObserver((mutations, observer) => {
        if (insertUploadButton()) {
            // If the button is successfully inserted, disconnect the observer
            uploadbtn.addEventListener("click", handleUploadButtonClick);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    searchBox = document.getElementById("row-input-0");
    searchBtn = document.getElementById("rCbtn-search");
    if (searchBox && searchBtn) {
        mutationInstance.disconnect();
    }
})

function handleUploadButtonClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display="none";
    fileInput.addEventListener('change', handleFileSelect);
    fileInput.click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onloadend = function(){
            const base64String = reader.result.split(',')[1];

            chrome.runtime.sendMessage({action: "SUBMIT", message: base64String});
        }

        reader.readAsDataURL(file);
    }
}

observer.observe(document, {
    childList: true,
    subtree: true
})

// receive the message from background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch(request.action){
        case "SUBMITTED":
            searchBox.value = request.message.trim();
            searchBtn.click();
            sendResponse({status:200})
            break;
        default:
            console.warn("Unhandled request.message from content.js", request.message)
            break;
    }
})