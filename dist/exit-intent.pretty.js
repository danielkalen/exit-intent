// Generated by CoffeeScript 1.10.0
(function($) {
  var ExitIntent, browserInfo;
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
  ExitIntent.version = '3.0.1';
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
  browserInfo = {
    isIE: document.all && !window.atob,
    isIE11: window.navigator.msPointerEnabled,
    isMobile: document.documentElement.className.indexOf('mobile') !== -1
  };
  ExitIntent.prototype.open = function() {
    this.popup.open();
    this.isOpen = true;
    return this.disabled = true;
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
    if (!browserInfo.isMobile) {
      $(window).on("mouseleave." + this.name, (function(_this) {
        return function(mouseEvent) {
          if (!(_this.disabled || Popup.prototype.isOpen || mouseEvent.clientY >= 1)) {
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
        } catch (undefined) {}
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
    return $(window).off("mouseleave." + this.name);
  };
  if ((typeof exports !== "undefined" && exports !== null ? exports.module : void 0) != null) {
    return module.exports = ExitIntent;
  } else if (typeof define === 'function' && define.amd) {
    return define(['ExitIntent'], function() {
      return ExitIntent;
    });
  } else {
    return window.ExitIntent = ExitIntent;
  }
})(jQuery);
