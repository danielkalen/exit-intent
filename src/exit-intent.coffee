do ($=jQuery)->
	ExitIntent = ({@el, name, popupOptions})->
		popupOptions = $.extend {forceOpen:true}, popupOptions
		@popup = new Popup(@el, @name, popupOptions)
		@name = @popup.name
		@disabled = false
		@isOpen = false

			
		@attachOpeningEvents()	
		@attachMiscEvents()	
		return ExitIntent.instances[@name] = @




	ExitIntent.version = import '../package.json $ version'
	ExitIntent.instances = {}
	ExitIntent.disableAll = ()-> instance.disabled = true for n,instance of ExitIntent.instances

	import './_parts/browserInfo.coffee'
	import './_parts/prototype.coffee'
	
	if module?.exports?
		module.exports = ExitIntent
	else if typeof define is 'function' and define.amd
		define ['exit-intent'], ()-> ExitIntent
	else
		window.ExitIntent = ExitIntent


