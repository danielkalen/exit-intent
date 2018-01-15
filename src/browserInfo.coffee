module.exports = 
	isIE: document.all and !window.atob
	isIE11: window.navigator.msPointerEnabled
	isEdge: /Edge/.test window.navigator?.userAgent or ''
	isMobile: document.documentElement.className.indexOf('mobile') isnt -1