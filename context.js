// global var to grab search box and search button
let searchBox;
let searchBtn;

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const searchBox = document.getElementById("row-input-0");
    const searchBtn = document.getElementById("rCbtn-search");
    if (searchBox && searchBtn) {
        searchBox.value = "cellphone";
        searchBtn.click();
        console.log("done!")
        mutationInstance.disconnect();
    }
})

observer.observe(document, {
    childList: true,
    subtree: true
})