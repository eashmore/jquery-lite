(function(){
  $l = function (arg) {
    var nodeArray = [];
    if (typeof arg === "string") {
      var els = document.querySelectorAll(arg);

      for (var i = 0; i < els.length; i++) {
        nodeArray.push(els[i]);
      }
    } else if (typeof arg === "object") {
      nodeArray.push(arg);
    }

    var nodeCollection = new DOMNodeCollection(nodeArray);
    return nodeCollection;
  };

  var DOMNodeCollection = function(array) {
    this.htmlElements = array;
  };

  DOMNodeCollection.prototype.html = function(str) {
    if (str) {
      this.htmlElements.forEach(function(el) {
        el.innerHTML = str;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.html("");

    this.htmlElements = [];
  };

  DOMNodeCollection.prototype.append = function(arg) {
    var html;

    if (typeof arg === 'string') {
      this.htmlElements.forEach(function(el) {
        html = el.innerHTML;
        el.innerHTML = html + arg;
      });
    } else if (typeof arg === 'object') {
      this.htmlElements.forEach(function(el) {
        html = el.innerHTML;
        arg.htmlElements.forEach(function(collectionEl) {
          el.innerHTML = html + collectionEl.outerHTML;
        });
      });
    }
  };

  DOMNodeCollection.prototype.attr = function() {

  };

  DOMNodeCollection.prototype.addClass = function() {
    
  };

  DOMNodeCollection.prototype.removeClass = function() {

  };
})();
