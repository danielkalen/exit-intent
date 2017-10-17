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
  ExitIntent.version = '3.0.5';
  
  ;
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
  var browserInfo;
  
  browserInfo = {
    isIE: document.all && !window.atob,
    isIE11: window.navigator.msPointerEnabled,
    isMobile: document.documentElement.className.indexOf('mobile') !== -1
  };
  
  ;
  var glio;
  
  glio = ;(function ( window , document ) {
    var glio = {
      /**
       * Initial Configuration
       * you can change the values before init method
       * glio.config.key = value;
       **/
      config: {
        screenWidthFragment: 12,  // the width of screen : 12
        centerTopHeight: 10, // the value of height to trigger a callback on center-top
        heightTopLeft: 30,  // the value of height when top-left direction is set
        heightTopRight: 30, // the value of height when top-right direction is set
      },
      // glio methods status
      statusTopLeft: "inactive",
      statusTopRight: "inactive",
      statusBottomLeft: "inactive",
      statusBottomRight: "inactive",
      statusTop: "inactive",
      init: function ( ) {
        // return a Array with the methods
        glio.methods = Array.prototype.slice.call(arguments);
        // get the direction and your correspondent callback
        Array.prototype.forEach.call(glio.methods, function (index) {
          if ( glio.getDirection( index[0], "top-left" ) ) {
            glio.topLeftFn = glio.trigger(index[1]);
          }
          else if ( glio.getDirection( index[0], "top-right" ) ) {
            glio.topRightFn = glio.trigger(index[1]);
          }
          else if ( glio.getDirection( index[0], "bottom-right" ) ) {
            glio.bottomRightFn = glio.trigger(index[1]);
          }
          else if ( glio.getDirection( index[0], "bottom-left" ) ) {
            glio.bottomLeftFn = glio.trigger(index[1]);
          }
          else if ( glio.getDirection( index[0], "top" ) ) {
            glio.TopFn = glio.trigger(index[1]);
          }
        });
        // Event mousemove just one time
        document.body.addEventListener('mousemove', function( event ) {
          var pointX = event.clientX
            , pointY = event.clientY
          ;
          
          if ( typeof glio.topLeftFn === "function" &&  glio.statusTopLeft === "inactive" ) {
            glio.callTopleft(pointX, pointY, glio.topLeftFn);
          }
          if (typeof glio.topRightFn === "function" && glio.statusTopRight === "inactive" ) {
            glio.callTopRight(pointX, pointY, glio.topRightFn);
          }
          if (typeof glio.bottomLeftFn === "function" && glio.statusBottomLeft === "inactive" ) {
            glio.callBottomLeft(pointX, pointY, glio.bottomLeftFn);
          }
          if (typeof glio.bottomRightFn === "function" && glio.statusBottomRight === "inactive" ) {
            glio.callBottomRight(pointX, pointY, glio.bottomRightFn);
          }
          if (typeof glio.TopFn === "function" && glio.statusTop === "inactive" ) {
            glio.callTop(pointX, pointY, glio.TopFn);
          }
        });
      },
      // return a callback who will pass like argument to other function
      trigger: function ( callback ) {
          return callback;
      },
      // the value of top-right screen, for use when user pass the mouse in the area
      getWidthRightValue: function ( ) {
        var screenWidthFragment = glio.getScreenWidthFragment()
          , topRightValue = ( screenWidthFragment * glio.config.screenWidthFragment ) - screenWidthFragment
        ;
        return parseInt(topRightValue);
      },
      // get the value of top height
      getTopHeight: function ( ) {
        var sHeight = 50;
        return sHeight;
      },
      // The value of total screen width are divided in parts
      getScreenWidthFragment: function () {
        var screenWidthFragment = (parseInt(window.innerWidth) / glio.config.screenWidthFragment);
        return screenWidthFragment;
      },
      // The value of total screen height are divided in parts
      getScreenHeightFragment: function () {
        var screenHeightFragment = (parseInt(window.innerHeight) / glio.config.screenWidthFragment);
        return screenHeightFragment;
      },
       // the height value of bottom. this value is the same, independent the direction
      getBottomHeightValue: function ( ) {
        var screenHeightFragment = glio.getScreenHeightFragment()
          , bottomRightValue = ( screenHeightFragment * glio.config.screenWidthFragment ) - screenHeightFragment
        ;
        return bottomRightValue;
      },
      // verify if direction who user is the same of directions who glio have
      getDirection: function ( directionUser, direction ) {
        if ( directionUser === direction ) {
          return true;
        };
        return false;
      },
      /*
       * Functions of each direction
       */
      callTopleft: function ( x, y, callback ) {
        if ( x <= glio.getScreenWidthFragment() && y <= glio.config.heightTopLeft ) {
          glio.statusTopLeft = "active";
          callback();
        };
      },
      callTopRight: function ( x, y, callback ) {
        if ( x > glio.getWidthRightValue() && y <= glio.config.heightTopRight ) {
          glio.statusTopRight = "active";
          callback();
        };         
      },
      callBottomRight: function ( x, y, callback ) {
        if ( x >= glio.getWidthRightValue() && y >= glio.getBottomHeightValue() ) {
          glio.statusBottomRight = "active";
          callback();
        };
      },
      callBottomLeft: function ( x, y, callback ) {
        if ( x <= glio.getScreenWidthFragment() && y >= glio.getBottomHeightValue() ) {
          glio.statusBottomLeft = "active";
          callback();
        };
      },
      // array to use in the callTop
      positionsTopY: [],
      callTop: function (x, y, callback ) {
        if ( y > (glio.config.centerTopHeight + 1)) {
          glio.positionsTopY.push(y);
        }
        if ( x > glio.getScreenWidthFragment() && x < glio.getWidthRightValue() ) {
          // check if the user mouse direction is bottom to top
          if ( y <= glio.config.centerTopHeight && glio.positionsTopY[0] > glio.config.centerTopHeight ) {
            glio.statusTop = "active";
            callback();
          }
        }
      },
      // return only the methods init and config
      start: function () {
        return {
          init: glio.init,
          config: glio.config
        }
      }
    };
    // return glio object
    if (!window.glio) {
      window.glio = glio.start();
    };
  
  }( window, document));;
  
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
    if (!browserInfo.isMobile) {
      $(document).on("mouseleave." + this.name, (function(_this) {
        return function(event) {
          var ref;
          if (_this.disabled || Popup.prototype.isOpen || event.relatedTarget) {
            return;
          }
          if (event.clientY < window.innerHeight / 2 && (0 < (ref = event.clientX + 20) && ref < window.innerWidth)) {
            _this.open();
            return _this.emit('mouseopen');
          }
        };
      })(this));
      glio.init([
        'top', (function(_this) {
          return function() {
            if (_this.disabled || Popup.prototype.isOpen) {
              return;
            }
            _this.open();
            return _this.emit('mouseopen');
          };
        })(this)
      ]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy52ZXJzaW9uLmNvZmZlZSIsIl9wYXJ0cy9icm93c2VySW5mby5jb2ZmZWUiLCJfcGFydHMvcHJvdG90eXBlLmNvZmZlZSJdLCJuYW1lcyI6WyJpbmxpbmU6MSIsImlubGluZToyIiwiaW5saW5lOjMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUFBQTs7RUFBUUE7Ozs7Ozs7Ozs7OztFQ0FSQzs7Ozs7Ozs7RUFHdUVBO0VDSHZFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQThGdUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyInMy4wLjUnXG4iLCJicm93c2VySW5mbyA9IFxuXHRpc0lFOiBkb2N1bWVudC5hbGwgYW5kICF3aW5kb3cuYXRvYlxuXHRpc0lFMTE6IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZFxuXHRpc01vYmlsZTogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdtb2JpbGUnKSBpc250IC0xIiwiZ2xpbyA9IGltcG9ydCAnZ2xpb2pzJ1xuXG5FeGl0SW50ZW50OjpvcGVuID0gKCktPlxuXHRAcG9wdXAub3BlbigpXG5cdEBpc09wZW4gPSB0cnVlXG5cdEBkaXNhYmxlZCA9IHRydWVcblx0QGRldGFjaE9wZW5pbmdFdmVudHMoKVxuXG5FeGl0SW50ZW50OjpjbG9zZSA9ICgpLT5cblx0QHBvcHVwLmNsb3NlKClcblx0QGlzT3BlbiA9IGZhbHNlXG5cbkV4aXRJbnRlbnQ6OmVtaXQgPSAoZXZlbnQpLT5cblx0QGVsLnRyaWdnZXIoZXZlbnQpXG5cdEBwb3B1cC5lbWl0KGV2ZW50KVxuXG5FeGl0SW50ZW50OjpyZXBsYWNlV2l0aCA9ICgkbmV3Rm9ybSktPlxuXHRAcG9wdXAucmVwbGFjZVdpdGgoJG5ld0Zvcm0pXG5cdEBhdHRhY2hNaXNjRXZlbnRzKClcblxuXG5cblx0XHRcblxuRXhpdEludGVudDo6YXR0YWNoT3BlbmluZ0V2ZW50cyA9ICgpLT5cblx0IyMjKlxuXHQjIE9wZW5zIHRoZSBwb3B1cCBpZiB0aGUgdXNlcidzIG1vdXNlIG1vdmVzIGZyb20gdGhlIGluc2lkZSBvZiB0aGUgdmlld3BvcnRcblx0IyB0byBvdXRzaWRlIG9mIHRoZSB2aWV3cG9ydCdzIFkgYXhpcy5cblx0IyMjXG5cdHVubGVzcyBicm93c2VySW5mby5pc01vYmlsZSAjIE5vIG5lZWQgdG8gYXR0YWNoIGZvciBtb2JpbGUgZGV2aWNlc1xuXHRcdCQoZG9jdW1lbnQpLm9uIFwibW91c2VsZWF2ZS4je0BuYW1lfVwiLCAoZXZlbnQpPT5cblx0XHRcdHJldHVybiBpZiBAZGlzYWJsZWQgb3IgUG9wdXA6OmlzT3BlbiBvciBldmVudC5yZWxhdGVkVGFyZ2V0XG5cdFx0XHQjIHRhcmdldCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQgb3IgZXZlbnQudG9FbGVtZW50XG5cdFx0XHQjIHJldHVybiBpZiBub3QgdGFyZ2V0IG9yIHRhcmdldC5ub2RlTmFtZSBpc250ICdIVE1MJ1xuXHRcdFx0IyByZXR1cm4gaWYgQGRpc2FibGVkIG9yIFBvcHVwOjppc09wZW4gb3IgZXZlbnQucmVsYXRlZFRhcmdldCBvciBldmVudC5jbGllbnRZID49IHdpbmRvdy5pbm5lckhlaWdodC8yXG5cdFx0XHRpZiBldmVudC5jbGllbnRZIDwgd2luZG93LmlubmVySGVpZ2h0LzIgYW5kIDAgPCBldmVudC5jbGllbnRYKzIwIDwgd2luZG93LmlubmVyV2lkdGhcblx0XHRcdCMgaWYgbm90IHRhcmdldCBvciB0YXJnZXQubm9kZU5hbWUgaXMgJ0hUTUwnXG5cdFx0XHRcdCMgY29uc29sZS5sb2cgeTpldmVudC5jbGllbnRZLCB4OmV2ZW50LmNsaWVudFgsIGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHQsIHdpZHRoOndpbmRvdy5pbm5lcldpZHRoXG5cdFx0XHRcdEBvcGVuKClcblx0XHRcdFx0QGVtaXQgJ21vdXNlb3BlbidcblxuXHRcdGdsaW8uaW5pdCBbJ3RvcCcsID0+XG5cdFx0XHRyZXR1cm4gaWYgQGRpc2FibGVkIG9yIFBvcHVwOjppc09wZW5cblx0XHRcdEBvcGVuKClcblx0XHRcdEBlbWl0ICdtb3VzZW9wZW4nXG5cdFx0XVxuXG5cblx0IyMjKlxuXHQjIE9wZW5zIHRoZSBwb3B1cCBpZiB0aGUgdXNlcidzIHRyaWVzIHRvIG5hdmlnYXRlIGJhY2t3YXJkcy4gV2UgYXBwbHkgYSB0cmlja1xuXHQjIHRvIHRoZSB3aW5kb3cuaGlzdG9yeSBwcm9wZXJ0eSB1c2luZyBpdHMgcmVwbGFjZVN0YXRlKCkgYW5kIHB1c2hTdGF0ZSgpIG1ldGhvZHNcblx0IyB0byByZWdpc3RlciB0aGUgcHJldmlvdXMgcGFnZSBpbiB0aGUgYnJvd3NlcidzIGhpc3RvcnkgYXMgdGhlIGN1cnJlbnQgcGFnZS4gV2Vcblx0IyB0aGVuIGxpc3RlbiB0byB0aGUgcG9wc3RhdGUgZXZlbnQgd2hpY2ggdHJpZ2dlcnMgd2hlbiB0aGUgcGFnZSBuYXZpZ2F0ZXMgYXdheS5cblx0IyBTaW5jZSBJRSBkb2Vzbid0IGZ1bGx5IHN1cHBvcnQgdGhlc2UgbWV0aG9kcywgd2UgZGlzYWJsZSB0aGVtIGNvbXBsZXRlbHkgZm9yIElFLlxuXHQjIyNcblx0dW5sZXNzIGJyb3dzZXJJbmZvLmlzSUUgb3IgYnJvd3NlckluZm8uaXNJRTExIG9yIGJyb3dzZXJJbmZvLmlzTW9iaWxlIG9yIEBkaXNhYmxlZCBvciBAaXNPcGVuXG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlIHtpZDogJ2V4aXQtaW5pdCd9LCAnJywgJydcblx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUge2lkOiAnZXhpdC1jb250cm9sJ30sICcnLCAnJ1xuXHRcdFxuXHRcdCQod2luZG93KS5vbiAncG9wc3RhdGUnLCAoZSk9PlxuXHRcdFx0aWYgIUBkaXNhYmxlZCBhbmQgJ3N0YXRlJyBvZiB3aW5kb3cuaGlzdG9yeSBhbmQgd2luZG93Lmhpc3Rvcnkuc3RhdGUgaXNudCBudWxsIGFuZCB3aW5kb3cuaGlzdG9yeS5zdGF0ZS5pZCAhPSAnZXhpdC1jb250cm9sJ1xuXHRcdFx0XHRAb3BlbigpXG5cdFx0XHRcdEBlbWl0ICdoaXN0b3J5b3Blbidcblx0XHRcdGVsc2Vcblx0XHRcdFx0d2luZG93Lmhpc3RvcnkuYmFjaygpXG5cblxuXG5cblxuXG5FeGl0SW50ZW50OjphdHRhY2hNaXNjRXZlbnRzID0gKCktPlxuXHRAZWwuZmluZCgnLm5vJykub24gXCJjbGljay4je0BuYW1lfVwiLCAoKT0+XG5cdFx0QGNsb3NlKClcblx0XHR0cnkgbG9jYWxTdG9yYWdlLnNldEl0ZW0gJ2V4aXRfaW50ZW50LWNvbXBsZXRlJywgJ3RydWUnXG5cblxuXHRAZWwuZmluZCgnLnN1Ym1pdCcpLm9uIFwiY2xpY2suI3tAbmFtZX1cIiwgKCk9PlxuXHRcdEBlbWl0ICdzdWJtaXR0ZWQnXG5cblxuXHRAZWwuZmluZCgnLnN0ZXAnKS5maXJzdCgpLmZpbmQoJy5uZXh0Jykub24gXCJjbGljay4je0BuYW1lfVwiLCAoKT0+XG5cdFx0QGVtaXQgJ2NvbnRpbnVlZCdcblxuXG5cblxuRXhpdEludGVudDo6ZGV0YWNoRXZlbnRzID0gKCktPlxuXHRAZWwuZmluZCgnLm5vJykub2ZmIFwiY2xpY2suI3tAbmFtZX1cIlxuXHRAZWwuZmluZCgnLnN1Ym1pdCcpLm9mZiBcImNsaWNrLiN7QG5hbWV9XCJcblx0QGVsLmZpbmQoJy5zdGVwJykuZmlyc3QoKS5maW5kKCcubmV4dCcpLm9mZiBcImNsaWNrLiN7QG5hbWV9XCJcblx0QGRldGFjaE9wZW5pbmdFdmVudHMoKVxuXG5FeGl0SW50ZW50OjpkZXRhY2hPcGVuaW5nRXZlbnRzID0gKCktPlxuXHQkKGRvY3VtZW50KS5vZmYgXCJtb3VzZWxlYXZlLiN7QG5hbWV9XCJcbiJdfQ==