!function(t){var i,n;return i=function(n){var e,o;return this.el=n.el,e=n.name,o=n.popupOptions,o=t.extend({forceOpen:!0},o),this.popup=new Popup(this.el,this.name,o),this.name=this.popup.name,this.disabled=!1,this.isOpen=!1,this.attachOpeningEvents(),this.attachMiscEvents(),i.instances[this.name]=this},i.version="3.0.1",i.instances={},i.disableAll=function(){var t,n,e,o;e=i.instances,o=[];for(n in e)t=e[n],o.push(t.disabled=!0);return o},n={isIE:document.all&&!window.atob,isIE11:window.navigator.msPointerEnabled,isMobile:document.documentElement.className.indexOf("mobile")!==-1},i.prototype.open=function(){return this.popup.open(),this.isOpen=!0,this.disabled=!0},i.prototype.close=function(){return this.popup.close(),this.isOpen=!1},i.prototype.emit=function(t){return this.el.trigger(t),this.popup.emit(t)},i.prototype.replaceWith=function(t){return this.popup.replaceWith(t),this.attachMiscEvents()},i.prototype.attachOpeningEvents=function(){if(n.isMobile||t(window).on("mouseleave."+this.name,function(t){return function(i){if(!(t.disabled||Popup.prototype.isOpen||i.clientY>=1))return t.open(),t.emit("mouseopen")}}(this)),!(n.isIE||n.isIE11||n.isMobile||this.disabled||this.isOpen))return window.history.replaceState({id:"exit-init"},"",""),window.history.pushState({id:"exit-control"},"",""),t(window).on("popstate",function(t){return function(i){return!t.disabled&&"state"in window.history&&null!==window.history.state&&"exit-control"!==window.history.state.id?(t.open(),t.emit("historyopen")):window.history.back()}}(this))},i.prototype.attachMiscEvents=function(){return this.el.find(".no").on("click."+this.name,function(t){return function(){t.close();try{return localStorage.setItem("exit_intent-complete","true")}catch(t){}}}(this)),this.el.find(".submit").on("click."+this.name,function(t){return function(){return t.emit("submitted")}}(this)),this.el.find(".step").first().find(".next").on("click."+this.name,function(t){return function(){return t.emit("continued")}}(this))},i.prototype.detachEvents=function(){return this.el.find(".no").off("click."+this.name),this.el.find(".submit").off("click."+this.name),this.el.find(".step").first().find(".next").off("click."+this.name),t(window).off("mouseleave."+this.name)},null!=("undefined"!=typeof exports&&null!==exports?exports.module:void 0)?module.exports=i:"function"==typeof define&&define.amd?define(["ExitIntent"],function(){return i}):window.ExitIntent=i}(jQuery);