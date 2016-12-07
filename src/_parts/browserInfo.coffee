browserInfo = 
	isIE: document.all and !window.atob
	isIE11: window.navigator.msPointerEnabled
	isMobile: document.documentElement.className.indexOf('mobile') isnt -1