(function(){
  var _docReadyFuncs = [];

  document.addEventListener('DOMContentLoaded', function() {
    _docReadyFuncs.forEach(function(func) {
      func();
    });
  });

  $l = function (arg) {
    var nodeArray = [];
    if (typeof arg === 'string') {
      var els = document.querySelectorAll(arg);
      for (var i = 0; i < els.length; i++) {
        nodeArray.push(els[i]);
      }
    } else if (typeof arg === 'object') {
      nodeArray.push(arg);
    } else if (typeof arg === 'function') {
      _docReadyFuncs.push(arg);
    }

    var nodeCollection = new DOMNodeCollection(nodeArray);
    return nodeCollection;
  };

  var DOMNodeCollection = function(array) {
    this.nodes = array;
  };

  $l.extend = function(base) {
    var args = [].slice.call(arguments, 1);
    args.forEach(function(arg){
      Object.keys(arg).forEach(function(key){
        base[key] = arg[key];
      });
    });

    return base;
  };

  $l.ajax = function(options) {
    var defaults = {
      url: '',
      method: 'GET',
      data: {},
      contentType: 'application/x-www-form-urlencoded',
      success: function() {},
      error: function() {}
    };

    var requestParams = $l.extend(defaults, options);
    var xmlhttp = new XMLRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 200) {
          requestParams.success(xmlhttp.response);
        } else {
          requestParams.error(xmlhttp.response);
        }
      }
    };

    xmlhttp.open(requestParams.method, requestParams.url, true);
    if (requestParams.method.match(/get/i)) {
      xmlhttp.send();
    } else {
      xhttp.setRequestHeader('Content-type', requestParams.contentType);
      xmlhttp.send(JSON.stringify(requestParams.data));
    }
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
    this.html('');
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

  DOMNodeCollection.prototype.prepend = function(arg) {
    var html;
    if (typeof arg === 'string') {
      this.nodes.forEach(function(el) {
        html = el.innerHTML;
        el.innerHTML = arg + html;
      });
    } else if (typeof arg === 'object') {
      this.nodes.forEach(function(el) {
        html = el.innerHTML;
        arg.nodes.forEach(function(collectionEl) {
          el.innerHTML = collectionEl.outerHTML + html;
        });
      });
    }
  };

  DOMNodeCollection.prototype.attr = function(str, value) {
    if (value === undefined) {
      return this.nodes[0].getAttribute(str);
    } else {
      this.nodes.forEach(function(node) {
        node.setAttribute(str, value);
      });
    }
  };

  DOMNodeCollection.prototype.addClass = function(newClass) {
    this.nodes.forEach(function(node) {
      node.classList.add(newClass);
    });
  };

  DOMNodeCollection.prototype.removeClass = function(oldClass) {
    this.nodes.forEach(function(node) {
      node.classList.remove(oldClass);
    });
  };

  DOMNodeCollection.prototype.children = function() {
    var children = new DOMNodeCollection([]);
    this.nodes.forEach(function(node) {
      for(var i = 0; i < node.children.length; i++) {
        children.nodes.push(node.children[i]);
      }
    });

    return children;
  };

  DOMNodeCollection.prototype.parents = function() {
    var parents = new DOMNodeCollection([]);
    this.nodes.forEach(function(node) {
      parents.nodes.push(node.parentNode);
    });

    return parents;
  };

  DOMNodeCollection.prototype.find = function(str) {
    var results = [];
    this.nodes.forEach(function(node) {
      var foundNodes = node.querySelectorAll(str);
      results = results.concat([].slice.call(foundNodes));
    });

    var collection = new DOMNodeCollection(results);
    return collection;
  };

  DOMNodeCollection.prototype.remove = function(str) {
    if (typeof str === 'string') {
      var foundNodes = this.find(str);
      foundNodes.nodes.forEach(function(node) {
        node.parentNode.removeChild(node);
      }.bind(this));
    } else {
      this.nodes.forEach(function(node) {
        node.parentNode.removeChild(node);
      });
    }
  };

  DOMNodeCollection.prototype.on = function(eventName, callback) {
    this.nodes.forEach(function(node) {
      node.addEventListener(eventName, callback);
    }.bind(this));
  };

  DOMNodeCollection.prototype.off = function(eventName, callback) {
    this.nodes.forEach(function(node) {
      node.removeEventListener(eventName, callback);
    });
  };
})();
