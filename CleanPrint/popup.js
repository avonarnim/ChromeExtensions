"use strict";

const highlighBtn = document.getElementById("Highlight");
const printBtn = document.getElementById("Print");

class Color {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}
let StartColor = new Color(255, 245, 224);
let EndColor = new Color(250, 169, 0);
let diffRed = EndColor.red - StartColor.red;
let diffGreen = EndColor.green - StartColor.green;
let diffBlue = EndColor.blue - StartColor.blue;
let colorIncrements = [StartColor];

const get_document_depth = function (el) {
  if (el.firstChild) {
    let max = 0;
    for (let i = 0; i < el.children.length; i++) {
      let inner_depth = get_document_depth(el.children[i]);
      if (inner_depth > max) {
        max = inner_depth;
      }
    }
    return max + 1;
  } else {
    return 1;
  }
};

let colorElements = function (parent, layer) {
  parent.children.forEach((element) => {
    colorElements(element, layer + 1);
  });
  element.color(layer);
  element.addEventListener("click", function () {
    element.recolorAndAddToListOfSoonToBePrinted();
    element.addEventListener("click", function () {
      // do opposite of what was just done: i.e. allow deselction
    });
  });
};

highlighBtn.addEventListener("click", function () {
  // Now have the max depth of the document
  let maxDepth = get_document_depth(document);

  // Generating color increments
  let colorUnitPercentage = 1 / (maxDepth - 1);
  let newColor = new Color(StartColor.red, StartColor.green, StartColor.blue);
  for (let i = 0; i < maxDepth - 1; i++) {
    newColor = new Color(
      newColor.red + Math.round(colorUnitPercentage * diffRed),
      newColor.green + Math.round(colorUnitPercentage * diffGreen),
      newColor.blue + Math.round(colorUnitPercentage * diffBlue)
    );
    colorIncrements.push(newColor);
  }
  console.log(colorIncrements);

  colorElements(document, 0);
});

printBtn.addEventListener("click", function () {
  // gather all textContents from selected elements
  // create file to be saved to local storage
});
