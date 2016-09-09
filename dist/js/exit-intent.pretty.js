// Generated by CoffeeScript 1.10.0

/**
 * A function that can be called from the global scope to manually disable
 * exit intents if so intended.
 */
var exitIntents, isIE, isIE11, isMobile;

isIE = document.all && !window.atob;

isIE11 = window.navigator.msPointerEnabled;

isMobile = document.documentElement.className.indexOf('mobile') !== -1;

exitIntents = [];

window.disableExitIntents = function() {
  return exitIntents.forEach(function(exitIntent) {
    return exitIntent.disable();
  });
};

(function($) {

  /**
  	 * The Exit Intent class that's used to instantiate Exit Intent popups.
  	 *
  	 * @param {object} el    jQuery object referencing the form that should be inserted into the exit intent.
  	 * @param {string} name  The unique name for this exit intent (will be used as an ID attr).
   */
  return this.ExitIntent = function(arg) {
    var dataToSend, name, ref;
    this.el = arg.el, name = arg.name, this.sendAnalytics = arg.sendAnalytics, this.analyticsClient = (ref = arg.analyticsClient) != null ? ref : '/ajax';
    this.name = name || 'popup_' + Math.floor(Math.random() * 100000);
    this.ID = this.el.data('id');
    this.popup = new Popup(this.el, this.name);
    this.disabled = false;
    this.opened = false;

    /**
    		 * Opens the popup instance of this exit intent and saves the fact
    		 * that it was open to localstorage so we can know if a user has
    		 * already seen this exit intent.
     */
    this.open = function() {
      this.popup.open();
      this.opened = true;
      return this.disable();
    };
    this.close = function() {
      this.popup.close();
      this.opened = false;
      return this;
    };
    this.enable = function() {
      this.disabled = false;
      return this;
    };
    this.disable = function() {
      this.disabled = true;
      return this;
    };
    this.emit = function(event) {
      this.el.trigger(event);
      this.popup.el.trigger(event);
      return this;
    };
    this.replaceWith = function($newForm) {
      this.popup.el.children('.popup-content').html($newForm);
      return this.attachMiscEvents;
    };
    this.attachOpeningEvents = function() {

      /**
      			 * Opens the popup if the user's mouse moves from the inside of the viewport
      			 * to outside of the viewport's Y axis.
       */
      if (!isMobile) {
        $$(window).on("mouseleave." + this.name, (function(_this) {
          return function(mouseEvent) {
            if (!(_this.disabled || Popup.prototype.isOpen || mouseEvent.clientY >= 1)) {
              return _this.open();
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
      if (!(isIE || isIE11 || isMobile || this.disabled || this.opened)) {
        window.history.replaceState({
          id: 'exit-init'
        }, '', '');
        window.history.pushState({
          id: 'exit-control'
        }, '', '');
        $$(window).on('popstate', (function(_this) {
          return function(e) {
            if (!_this.disabled && 'state' in window.history && window.history.state !== null && window.history.state.id !== 'exit-control') {
              return _this.open();
            }
          };
        })(this));
      }
      return this;
    };

    /**
    		 * Triggers a 'closed' event on the exit intent's popup instance so that we can
    		 * attach event listeners for various other purposes such as statistics tracking.
     */
    this.attachMiscEvents = function() {
      $('.popup-overlay').on("click." + this.name, (function(_this) {
        return function(event) {
          var $overlay, isExitIntentOverlay;
          $overlay = $(event.currentTarget);
          isExitIntentOverlay = $overlay.hasClass('belongs_to_exit-intent');
          if (isExitIntentOverlay) {
            return _this.popup.el.trigger('closed');
          }
        };
      })(this));
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
          _this.emit('submitted');
          return _this.popup.el.trigger('submitted');
        };
      })(this));
      this.el.find('.step').first().find('.next').on("click." + this.name, (function(_this) {
        return function() {
          _this.emit('continued');
          return _this.popup.el.trigger('continued');
        };
      })(this));
      if (this.sendAnalytics) {
        this.popup.el.on('opened', (function(_this) {
          return function() {
            return _this.sendData('opened');
          };
        })(this));
        this.popup.el.on('closed', (function(_this) {
          return function() {
            return _this.sendData('clicked_no');
          };
        })(this));
        this.popup.el.on('continued', (function(_this) {
          return function() {
            return _this.sendData('clicked_yes');
          };
        })(this));
        return this.popup.el.on('submitted', (function(_this) {
          return function() {
            return _this.sendData('submitted');
          };
        })(this));
      }
    };
    this.detachAllEvents = function() {
      $('.popup-overlay').off("click." + this.name);
      this.el.find('.no').off("click." + this.name);
      this.el.find('.submit').off("click." + this.name);
      this.el.find('.step').first().find('.next').off("click." + this.name);
      return $$(window).off("mouseleave." + this.name);
    };
    dataToSend = {
      action: 'update_campaign_stat',
      type: 'exit_intent',
      itemID: this.ID
    };
    this.sendData = function(action) {
      dataToSend.user_action = action;
      $.post(this.analyticsClient, dataToSend);
      return this;
    };
    this.attachOpeningEvents();
    this.attachMiscEvents();
    return this;
  };
})(jQuery);
