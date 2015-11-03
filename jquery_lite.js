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
    this.nodes = array;
  };

  DOMNodeCollection.prototype.html = function(str) {
    if (str) {
      this.nodes.forEach(function(el) {
        el.innerHTML = str;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.html("");

    this.nodes = [];
  };

  DOMNodeCollection.prototype.append = function(arg) {
    var html;

    if (typeof arg === 'string') {
      this.nodes.forEach(function(el) {
        html = el.innerHTML;
        el.innerHTML = html + arg;
      });
    } else if (typeof arg === 'object') {
      this.nodes.forEach(function(el) {
        html = el.innerHTML;
        arg.nodes.forEach(function(collectionEl) {
          el.innerHTML = html + collectionEl.outerHTML;
        });
      });
    }
  };

  DOMNodeCollection.prototype.attr = function(str, value) {
    var attribute = this.nodes[0].getAttribute(str);

    if (typeof value === 'string') {
      this.nodes.forEach(function(node) {
        node.setAttribute(str, value);
      });
    } else {
      return attribute;
    }
  };

  DOMNodeCollection.prototype.addClass = function(newClass) {
    this.nodes.forEach(function(node) {
      node.classList.add(newClass);
    });
  };

  DOMNodeCollection.prototype.removeClass = function(oldClass) {
    this.node.forEach(function(node) {
      node.classList.remove(oldClass);
    });
  };
})();
