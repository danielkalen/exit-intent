(function (require) {
require = (function (cache, modules, cx) {
return function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
})({}, {
0: function (require, module, exports) {
(function($) {
  var ExitIntent;
  ExitIntent = function(arg) {
    var name, popupOptions;
    this.el = arg.el, name = arg.name, popupOptions = arg.popupOptions;
    popupOptions = $.extend({
      forceOpen: true
    }, popupOptions);
    this.popup = new Popup(this.el, this.name, popupOptions);
    this.name = this.popup.name;
    this.disabled = false;
    this.isOpen = false;
    this.attachOpeningEvents();
    this.attachMiscEvents();
    return ExitIntent.instances[this.name] = this;
  };
  ExitIntent.version = "3.1.0";
  ExitIntent.instances = {};
  ExitIntent.disableAll = function() {
    var instance, n, ref, results;
    ref = ExitIntent.instances;
    results = [];
    for (n in ref) {
      instance = ref[n];
      results.push(instance.disabled = true);
    }
    return results;
  };
  var browserInfo, ref;
  
  browserInfo = {
    isIE: document.all && !window.atob,
    isIE11: window.navigator.msPointerEnabled,
    isEdge: /Edge/.test(((ref = window.navigator) != null ? ref.userAgent : void 0) || ''),
    isMobile: document.documentElement.className.indexOf('mobile') !== -1
  };
  
  ;
  ExitIntent.prototype.open = function() {
    this.popup.open();
    this.isOpen = true;
    this.disabled = true;
    return this.detachOpeningEvents();
  };
  
  ExitIntent.prototype.close = function() {
    this.popup.close();
    return this.isOpen = false;
  };
  
  ExitIntent.prototype.emit = function(event) {
    this.el.trigger(event);
    return this.popup.emit(event);
  };
  
  ExitIntent.prototype.replaceWith = function($newForm) {
    this.popup.replaceWith($newForm);
    return this.attachMiscEvents();
  };
  
  ExitIntent.prototype.attachOpeningEvents = function() {
  
    /**
    	 * Opens the popup if the user's mouse moves from the inside of the viewport
    	 * to outside of the viewport's Y axis.
     */
    var threshold;
    if (!browserInfo.isMobile) {
      threshold = browserInfo.isIE || browserInfo.isIE11 || browserInfo.isEdge ? 125 : 15;
      $(document).on("mouseleave." + this.name, (function(_this) {
        return function(event) {
          if (_this.disabled || Popup.prototype.isOpen || event.relatedTarget) {
            return;
          }
          if (event.clientY <= threshold) {
            _this.open();
            return _this.emit('mouseopen');
          }
        };
      })(this));
    }
  
    /**
    	 * Opens the popup if the user's tries to navigate backwards. We apply a trick
    	 * to the window.history property using its replaceState() and pushState() methods
    	 * to register the previous page in the browser's history as the current page. We
    	 * then listen to the popstate event which triggers when the page navigates away.
    	 * Since IE doesn't fully support these methods, we disable them completely for IE.
     */
    if (!(browserInfo.isIE || browserInfo.isIE11 || browserInfo.isMobile || this.disabled || this.isOpen)) {
      window.history.replaceState({
        id: 'exit-init'
      }, '', '');
      window.history.pushState({
        id: 'exit-control'
      }, '', '');
      return $(window).on('popstate', (function(_this) {
        return function(e) {
          if (!_this.disabled && 'state' in window.history && window.history.state !== null && window.history.state.id !== 'exit-control') {
            _this.open();
            return _this.emit('historyopen');
          } else {
            return window.history.back();
          }
        };
      })(this));
    }
  };
  
  ExitIntent.prototype.attachMiscEvents = function() {
    this.el.find('.no').on("click." + this.name, (function(_this) {
      return function() {
        _this.close();
        try {
          return localStorage.setItem('exit_intent-complete', 'true');
        } catch (error) {}
      };
    })(this));
    this.el.find('.submit').on("click." + this.name, (function(_this) {
      return function() {
        return _this.emit('submitted');
      };
    })(this));
    return this.el.find('.step').first().find('.next').on("click." + this.name, (function(_this) {
      return function() {
        return _this.emit('continued');
      };
    })(this));
  };
  
  ExitIntent.prototype.detachEvents = function() {
    this.el.find('.no').off("click." + this.name);
    this.el.find('.submit').off("click." + this.name);
    this.el.find('.step').first().find('.next').off("click." + this.name);
    return this.detachOpeningEvents();
  };
  
  ExitIntent.prototype.detachOpeningEvents = function() {
    return $(document).off("mouseleave." + this.name);
  };
  
  ;
  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    return module.exports = ExitIntent;
  } else if (typeof define === 'function' && define.amd) {
    return define(['exit-intent'], function() {
      return ExitIntent;
    });
  } else {
    return window.ExitIntent = ExitIntent;
  }
})(jQuery);

;
return module.exports;
}
}, this);
return require(0);
}).call(this, null);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3BhY2thZ2UuanNvbiIsIl9wYXJ0cy9icm93c2VySW5mby5jb2ZmZWUiLCJfcGFydHMvcHJvdG90eXBlLmNvZmZlZSJdLCJuYW1lcyI6WyJpbmxpbmU6MSIsImlubGluZToyIiwiaW5saW5lOjMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUFBQSxPQXVDRUE7Ozs7Ozs7Ozs7OztFQ3ZDRkM7Ozs7Ozs7OztFQUl1RUE7RUNKdkVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0Z1Q0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIntcbiAgXCJuYW1lXCI6IFwiQGRhbmllbGthbGVuL2V4aXQtaW50ZW50XCIsXG4gIFwidmVyc2lvblwiOiBcIjMuMS4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJFeGl0IEludGVudCBFbmdpbmVcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9leGl0LWludGVudC5qc1wiLFxuICBcImJyb3dzZXJcIjoge1xuICAgIFwiLi9kaXN0L2V4aXQtaW50ZW50LmpzXCI6IFwic3JjL2V4aXQtaW50ZW50LmNvZmZlZVwiLFxuICAgIFwiLi9zcmNcIjogXCJzcmMvZXhpdC1pbnRlbnQuY29mZmVlXCIsXG4gICAgXCIuL2RlYnVnXCI6IFwiZGlzdC9leGl0LWludGVudC5kZWJ1Zy5qc1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNvZmZlZS1zY3JpcHRcIjogXCJeMS4xMi4wXCIsXG4gICAgXCJzaW1wbHlpbXBvcnRcIjogXCJeNC4wLjAtczM1XCIsXG4gICAgXCJzaW1wbHl3YXRjaFwiOiBcIl4zLjAuMC1sMlwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4yXCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImpxdWVyeVwiOiBcIipcIixcbiAgICBcIkBkYW5pZWxrYWxlbi9wb3B1cC1lbmdpbmVcIjogXCJeMy4wLjBcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwicG9zdHZlcnNpb25cIjogXCJucG0gcnVuIGJ1aWxkICYmIGdpdCBhZGQgLiAmJiBnaXQgY29tbWl0IC1hIC1tICdbQnVpbGRdJ1wiLFxuICAgIFwicG9zdHB1Ymxpc2hcIjogXCJnaXQgcHVzaFwiLFxuICAgIFwiYnVpbGRcIjogXCJucG0gcnVuIGNvbXBpbGUgJiYgbnBtIHJ1biBtaW5pZnlcIixcbiAgICBcImNvbXBpbGVcIjogXCJzaW1wbHlpbXBvcnQgYnVuZGxlIC1kIHNyYy9leGl0LWludGVudC5jb2ZmZWUgPiBkaXN0L2V4aXQtaW50ZW50LmRlYnVnLmpzXCIsXG4gICAgXCJtaW5pZnlcIjogXCJ1Z2xpZnlqcyBkaXN0L2V4aXQtaW50ZW50LmRlYnVnLmpzIC1tIC1jIGtlZXBfZmFyZ3MsdW51c2VkPWZhbHNlIC1vIGRpc3QvZXhpdC1pbnRlbnQuanNcIixcbiAgICBcIndhdGNoXCI6IFwic2ltcGx5d2F0Y2ggLWcgJ3NyYy8qJyAteCAnbnBtIHJ1biBjb21waWxlIC1zJ1wiXG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL2V4aXQtaW50ZW50LmdpdFwiXG4gIH0sXG4gIFwiYXV0aG9yXCI6IFwiRGFuaWVsIEthbGVuXCIsXG4gIFwibGljZW5zZVwiOiBcIklTQ1wiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL2V4aXQtaW50ZW50L2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vZXhpdC1pbnRlbnQjcmVhZG1lXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHt9XG59XG4iLCJicm93c2VySW5mbyA9IFxuXHRpc0lFOiBkb2N1bWVudC5hbGwgYW5kICF3aW5kb3cuYXRvYlxuXHRpc0lFMTE6IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZFxuXHRpc0VkZ2U6IC9FZGdlLy50ZXN0IHdpbmRvdy5uYXZpZ2F0b3I/LnVzZXJBZ2VudCBvciAnJ1xuXHRpc01vYmlsZTogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdtb2JpbGUnKSBpc250IC0xIiwiRXhpdEludGVudDo6b3BlbiA9ICgpLT5cblx0QHBvcHVwLm9wZW4oKVxuXHRAaXNPcGVuID0gdHJ1ZVxuXHRAZGlzYWJsZWQgPSB0cnVlXG5cdEBkZXRhY2hPcGVuaW5nRXZlbnRzKClcblxuRXhpdEludGVudDo6Y2xvc2UgPSAoKS0+XG5cdEBwb3B1cC5jbG9zZSgpXG5cdEBpc09wZW4gPSBmYWxzZVxuXG5FeGl0SW50ZW50OjplbWl0ID0gKGV2ZW50KS0+XG5cdEBlbC50cmlnZ2VyKGV2ZW50KVxuXHRAcG9wdXAuZW1pdChldmVudClcblxuRXhpdEludGVudDo6cmVwbGFjZVdpdGggPSAoJG5ld0Zvcm0pLT5cblx0QHBvcHVwLnJlcGxhY2VXaXRoKCRuZXdGb3JtKVxuXHRAYXR0YWNoTWlzY0V2ZW50cygpXG5cblxuXG5cdFx0XG5cbkV4aXRJbnRlbnQ6OmF0dGFjaE9wZW5pbmdFdmVudHMgPSAoKS0+XG5cdCMjIypcblx0IyBPcGVucyB0aGUgcG9wdXAgaWYgdGhlIHVzZXIncyBtb3VzZSBtb3ZlcyBmcm9tIHRoZSBpbnNpZGUgb2YgdGhlIHZpZXdwb3J0XG5cdCMgdG8gb3V0c2lkZSBvZiB0aGUgdmlld3BvcnQncyBZIGF4aXMuXG5cdCMjI1xuXHR1bmxlc3MgYnJvd3NlckluZm8uaXNNb2JpbGUgIyBObyBuZWVkIHRvIGF0dGFjaCBmb3IgbW9iaWxlIGRldmljZXNcblx0XHR0aHJlc2hvbGQgPSBpZiBicm93c2VySW5mby5pc0lFIG9yIGJyb3dzZXJJbmZvLmlzSUUxMSBvciBicm93c2VySW5mby5pc0VkZ2UgdGhlbiAxMjUgZWxzZSAxNVxuXHRcdCQoZG9jdW1lbnQpLm9uIFwibW91c2VsZWF2ZS4je0BuYW1lfVwiLCAoZXZlbnQpPT5cblx0XHRcdHJldHVybiBpZiBAZGlzYWJsZWQgb3IgUG9wdXA6OmlzT3BlbiBvciBldmVudC5yZWxhdGVkVGFyZ2V0XG5cdFx0XHRpZiBldmVudC5jbGllbnRZIDw9IHRocmVzaG9sZFxuXHRcdFx0XHRAb3BlbigpXG5cdFx0XHRcdEBlbWl0ICdtb3VzZW9wZW4nXG5cblxuXHQjIyMqXG5cdCMgT3BlbnMgdGhlIHBvcHVwIGlmIHRoZSB1c2VyJ3MgdHJpZXMgdG8gbmF2aWdhdGUgYmFja3dhcmRzLiBXZSBhcHBseSBhIHRyaWNrXG5cdCMgdG8gdGhlIHdpbmRvdy5oaXN0b3J5IHByb3BlcnR5IHVzaW5nIGl0cyByZXBsYWNlU3RhdGUoKSBhbmQgcHVzaFN0YXRlKCkgbWV0aG9kc1xuXHQjIHRvIHJlZ2lzdGVyIHRoZSBwcmV2aW91cyBwYWdlIGluIHRoZSBicm93c2VyJ3MgaGlzdG9yeSBhcyB0aGUgY3VycmVudCBwYWdlLiBXZVxuXHQjIHRoZW4gbGlzdGVuIHRvIHRoZSBwb3BzdGF0ZSBldmVudCB3aGljaCB0cmlnZ2VycyB3aGVuIHRoZSBwYWdlIG5hdmlnYXRlcyBhd2F5LlxuXHQjIFNpbmNlIElFIGRvZXNuJ3QgZnVsbHkgc3VwcG9ydCB0aGVzZSBtZXRob2RzLCB3ZSBkaXNhYmxlIHRoZW0gY29tcGxldGVseSBmb3IgSUUuXG5cdCMjI1xuXHR1bmxlc3MgYnJvd3NlckluZm8uaXNJRSBvciBicm93c2VySW5mby5pc0lFMTEgb3IgYnJvd3NlckluZm8uaXNNb2JpbGUgb3IgQGRpc2FibGVkIG9yIEBpc09wZW5cblx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUge2lkOiAnZXhpdC1pbml0J30sICcnLCAnJ1xuXHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSB7aWQ6ICdleGl0LWNvbnRyb2wnfSwgJycsICcnXG5cdFx0XG5cdFx0JCh3aW5kb3cpLm9uICdwb3BzdGF0ZScsIChlKT0+XG5cdFx0XHRpZiAhQGRpc2FibGVkIGFuZCAnc3RhdGUnIG9mIHdpbmRvdy5oaXN0b3J5IGFuZCB3aW5kb3cuaGlzdG9yeS5zdGF0ZSBpc250IG51bGwgYW5kIHdpbmRvdy5oaXN0b3J5LnN0YXRlLmlkICE9ICdleGl0LWNvbnRyb2wnXG5cdFx0XHRcdEBvcGVuKClcblx0XHRcdFx0QGVtaXQgJ2hpc3RvcnlvcGVuJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5iYWNrKClcblxuXG5cblxuXG5cbkV4aXRJbnRlbnQ6OmF0dGFjaE1pc2NFdmVudHMgPSAoKS0+XG5cdEBlbC5maW5kKCcubm8nKS5vbiBcImNsaWNrLiN7QG5hbWV9XCIsICgpPT5cblx0XHRAY2xvc2UoKVxuXHRcdHRyeSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSAnZXhpdF9pbnRlbnQtY29tcGxldGUnLCAndHJ1ZSdcblxuXG5cdEBlbC5maW5kKCcuc3VibWl0Jykub24gXCJjbGljay4je0BuYW1lfVwiLCAoKT0+XG5cdFx0QGVtaXQgJ3N1Ym1pdHRlZCdcblxuXG5cdEBlbC5maW5kKCcuc3RlcCcpLmZpcnN0KCkuZmluZCgnLm5leHQnKS5vbiBcImNsaWNrLiN7QG5hbWV9XCIsICgpPT5cblx0XHRAZW1pdCAnY29udGludWVkJ1xuXG5cblxuXG5FeGl0SW50ZW50OjpkZXRhY2hFdmVudHMgPSAoKS0+XG5cdEBlbC5maW5kKCcubm8nKS5vZmYgXCJjbGljay4je0BuYW1lfVwiXG5cdEBlbC5maW5kKCcuc3VibWl0Jykub2ZmIFwiY2xpY2suI3tAbmFtZX1cIlxuXHRAZWwuZmluZCgnLnN0ZXAnKS5maXJzdCgpLmZpbmQoJy5uZXh0Jykub2ZmIFwiY2xpY2suI3tAbmFtZX1cIlxuXHRAZGV0YWNoT3BlbmluZ0V2ZW50cygpXG5cbkV4aXRJbnRlbnQ6OmRldGFjaE9wZW5pbmdFdmVudHMgPSAoKS0+XG5cdCQoZG9jdW1lbnQpLm9mZiBcIm1vdXNlbGVhdmUuI3tAbmFtZX1cIlxuIl19