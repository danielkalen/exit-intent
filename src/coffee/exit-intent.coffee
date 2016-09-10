do ($=jQuery)->
	isIE = document.all and !window.atob
	isIE11 = window.navigator.msPointerEnabled
	isMobile = document.documentElement.className.indexOf('mobile') isnt -1

	###*
	# The Exit Intent class used to instantiate Exit Intent popups.
	#
	# @param {object} el    jQuery object referencing the form that should be inserted into the exit intent.
	# @param {string} name  The unique name for this exit intent (will be used as an ID attr).
	###
	ExitIntent = ({@el, name})->
		@name = name or 'popup_'+Math.floor(Math.random() * 100000)		
		@popup = new Popup(@el, @name)
		@disabled = false
		@isOpen = false

			
		@attachOpeningEvents()	
		@attachMiscEvents()	
		return ExitIntent.instances[@name] = @




	ExitIntent.version = import '../.version.coffee'
	ExitIntent.instances = {}
	ExitIntent.disableAll = ()-> instance.disabled = true for n,instance of ExitIntent.instances



	ExitIntent::open = ()->
		@popup.open()
		@isOpen = true
		@disabled = true
	
	ExitIntent::close = ()->
		@popup.close()
		@isOpen = false

	ExitIntent::emit = (event)->
		@el.trigger(event)
		@popup.el.trigger(event)

	ExitIntent::replaceWith = ($newForm)->
		@popup.el.children('.popup-content').html $newForm
		@attachMiscEvents()



			

	ExitIntent::attachOpeningEvents = ()->
		###*
		# Opens the popup if the user's mouse moves from the inside of the viewport
		# to outside of the viewport's Y axis.
		###
		unless isMobile # No need to attach for mobile devices
			$(window).on "mouseleave.#{@name}", (mouseEvent)=>
				@open() unless @disabled or Popup::isOpen or mouseEvent.clientY >= 1


		###*
		# Opens the popup if the user's tries to navigate backwards. We apply a trick
		# to the window.history property using its replaceState() and pushState() methods
		# to register the previous page in the browser's history as the current page. We
		# then listen to the popstate event which triggers when the page navigates away.
		# Since IE doesn't fully support these methods, we disable them completely for IE.
		###
		unless isIE or isIE11 or isMobile or @disabled or @isOpen
			window.history.replaceState {id: 'exit-init'}, '', ''
			window.history.pushState {id: 'exit-control'}, '', ''
			
			$(window).on 'popstate', (e)=>
				@open() if !@disabled and 'state' of window.history and window.history.state isnt null and window.history.state.id != 'exit-control'



	

	ExitIntent::attachMiscEvents = ()->
		$('.popup-overlay').on "click.#{@name}", (event)=>
			$overlay = $(event.currentTarget)
			isExitIntentOverlay = $overlay.hasClass 'belongs_to_exit-intent'
			@popup.el.trigger 'closed' if isExitIntentOverlay


		@el.find('.no').on "click.#{@name}", ()=>
			@close()
			try localStorage.setItem 'exit_intent-complete', 'true'


		@el.find('.submit').on "click.#{@name}", ()=>
			@emit 'submitted'


		@el.find('.step').first().find('.next').on "click.#{@name}", ()=>
			@emit 'continued'




	ExitIntent::detachEvents = ()->
		$('.popup-overlay').off "click.#{@name}"
		@el.find('.no').off "click.#{@name}"
		@el.find('.submit').off "click.#{@name}"
		@el.find('.step').first().find('.next').off "click.#{@name}"
		$(window).off "mouseleave.#{@name}"










	window.ExitIntent = ExitIntent