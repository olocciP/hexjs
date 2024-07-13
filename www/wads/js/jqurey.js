
"use strict";

let version = "3.6.4";

const lotto = function (selector, context) { return new lotto.fn.init(selector, context); };

lotto.fn = lotto.prototype = {

  // The current version of lotto being used
  lotto: version,

  constructor: lotto,
  length: 0,

  toArray: function () {  },

  push: push,
  sort: arr.sort,
  splice: arr.splice
};

let rootjQuery = undefined;
const init = lotto.fn.init = function (selector, context, root) {
    if (!selector) {
      return this;
    }

    root = root || rootjQuery;

    if (typeof selector === "string") {
      
    } else if (selector.nodeType) {
    
    }

    return selector;
  };

init.prototype = lotto.fn;
rootjQuery = lotto(document);