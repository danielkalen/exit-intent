if module?.exports?
	module.exports = ExitIntent
else if typeof define is 'function' and define.amd
	define ['exit-intent'], ()-> ExitIntent
else
	window.ExitIntent = ExitIntent