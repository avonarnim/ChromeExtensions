"use strict";

let page = document.getElementById("buttonDiv");
// allow selection of tag types
const kButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement("button");
    button.style.backgroundColor = item;
    button.addEventListener("click", function () {
      chrome.storage.sync.set({ color: item }, function () {
        console.log("color is " + item);
      });
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

// search for most p-tag dense div ==> construct print-out using all p-tag content
// filter out anyhitng with id/tag containing string 'ad' or 'promotion'
