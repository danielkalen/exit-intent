$ = window.jQuery

class ExitIntent
	constructor: ({@el, name, popupOptions})->
		return new ExitIntent(arguments[0]) if @ not instanceof ExitIntent
		popupOptions = $.extend {forceOpen:true}, popupOptions
		@popup = new Popup(@el, @name, popupOptions)
		@name = @popup.name
		@disabled = false
		@isOpen = false

			
		@attachOpeningEvents()	
		@attachMiscEvents()	
		ExitIntent.instances[@name] = @

	
	@version = import '../package.json $ version'
	@instances = {}
	@disableAll = ()->
		for n,instance of ExitIntent.instances
			instance.disabled = true
		return


$.extend @::, import './prototype'


module.exports = ExitIntent