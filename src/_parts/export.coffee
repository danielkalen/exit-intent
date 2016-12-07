if exports?.module?
	module.exports = ExitIntent
else if typeof define is 'function' and define.amd
	define ['ExitIntent'], ()-> ExitIntent
else
	window.ExitIntent = ExitIntent