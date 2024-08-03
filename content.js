// global var to grab search box and search button
let searchBox;
let searchBtn;

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