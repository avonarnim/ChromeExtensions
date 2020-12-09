"use strict";
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

let maxDepth = get_document_depth(document);
console.log(maxDepth);
