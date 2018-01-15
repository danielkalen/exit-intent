extend = import 'smart-extend'
defaults = import './defaults'

class ExitIntent
	constructor: ({@el, @name, options, popupOptions})->
		return new ExitIntent(arguments[0]) if @ not instanceof ExitIntent
		@options = extend.clone(defaults, options)
		@popup = @createPopup(popupOptions)
		@name = @popup.name
		@disabled = false
		@isOpen = false

			
		@attachOpeningEvents()	
		@attachMiscEvents()	
		ExitIntent.instances[@name] = @

	createPopup: (options)->
		options = extend({forceOpen:true}, options)
		popup = new Popup(@el, @name, options)
		@name = popup.name
		return popup

	
	@version = import '../package.json $ version'
	@instances = {}
	@disableAll = ()->
		for n,instance of ExitIntent.instances
			instance.disabled = true
		return


extend @::, import './prototype'


module.exports = ExitIntent