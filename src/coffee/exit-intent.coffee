###*
# A function that can be called from the global scope to manually disable
# exit intents if so intended. 
###

isIE = document.all and !window.atob
isIE11 = window.navigator.msPointerEnabled
isMobile = document.documentElement.className.indexOf('mobile') isnt -1
exitIntents = []
window.disableExitIntents = ()-> exitIntents.forEach (exitIntent)-> exitIntent.disable()

do ($=jQuery)->
	###*
	# The Exit Intent class that's used to instantiate Exit Intent popups.
	#
	# @param {object} el    jQuery object referencing the form that should be inserted into the exit intent.
	# @param {string} name  The unique name for this exit intent (will be used as an ID attr).
	###
	@ExitIntent = ({@el, name, @sendAnalytics, @analyticsClient='/ajax'})->
		@name = name or 'popup_'+Math.floor(Math.random() * 100000)		
		@ID = @el.data('id')
		@popup = new Popup(@el, @name)
		@disabled = false
		@opened = false
		


		###*
		# Opens the popup instance of this exit intent and saves the fact
		# that it was open to localstorage so we can know if a user has
		# already seen this exit intent.
		###
		@open = ()->
			@popup.open()
			@opened = true
			@disable()
		
		@close = ()->
			@popup.close()
			@opened = false
			return @

		@enable = ()->
			@disabled = false
			return @
		
		@disable = ()->
			@disabled = true
			return @

		@emit = (event)->
			@el.trigger event
			@popup.el.trigger event
			return @

		@replaceWith = ($newForm)->
			@popup.el.children('.popup-content').html $newForm
			@attachMiscEvents
			






		# ==== Popup Trigger Event attachment =================================================================================
		@attachOpeningEvents = ()->
			###*
			# Opens the popup if the user's mouse moves from the inside of the viewport
			# to outside of the viewport's Y axis.
			###
			unless isMobile # No need to attach for mobile devices
				$$(window).on "mouseleave.#{@name}", (mouseEvent)=>
					@open() unless @disabled or Popup::isOpen or mouseEvent.clientY >= 1



			###*
			# Opens the popup if the user's tries to navigate backwards. We apply a trick
			# to the window.history property using its replaceState() and pushState() methods
			# to register the previous page in the browser's history as the current page. We
			# then listen to the popstate event which triggers when the page navigates away.
			# Since IE doesn't fully support these methods, we disable them completely for IE.
			###
			unless isIE or isIE11 or isMobile or @disabled or @opened
				window.history.replaceState { id: 'exit-init' }, '', ''
				window.history.pushState { id: 'exit-control' }, '', ''
				
				$$(window).on 'popstate', (e)=>
					@open() if !@disabled and 'state' of window.history and window.history.state isnt null and window.history.state.id != 'exit-control'

			return @


		




		# ==== Event Triggers =================================================================================
		###*
		# Triggers a 'closed' event on the exit intent's popup instance so that we can
		# attach event listeners for various other purposes such as statistics tracking.
		###
		@attachMiscEvents = ()->
			$('.popup-overlay').on "click.#{@name}", (event)=>
				$overlay = $(event.currentTarget)
				isExitIntentOverlay = $overlay.hasClass 'belongs_to_exit-intent'
				@popup.el.trigger 'closed' if isExitIntentOverlay

			@el.find('.no').on "click.#{@name}", ()=>
				@close()
				try localStorage.setItem 'exit_intent-complete', 'true'


			@el.find('.submit').on "click.#{@name}", ()=>
				@emit 'submitted'
				@popup.el.trigger 'submitted'


			@el.find('.step').first().find('.next').on "click.#{@name}", ()=>
				@emit 'continued'
				@popup.el.trigger('continued')


			# ==== Behavior Logging =================================================================================
			if @sendAnalytics
				@popup.el.on 'opened', ()=> @sendData('opened')
				@popup.el.on 'closed', ()=> @sendData('clicked_no')
				@popup.el.on 'continued', ()=> @sendData('clicked_yes')
				@popup.el.on 'submitted', ()=> @sendData('submitted')



		@detachAllEvents = ()->
			$('.popup-overlay').off "click.#{@name}"
			@el.find('.no').off "click.#{@name}"
			@el.find('.submit').off "click.#{@name}"
			@el.find('.step').first().find('.next').off "click.#{@name}"
			$$(window).off "mouseleave.#{@name}"






		dataToSend = 
			action: 'update_campaign_stat'
			type: 'exit_intent'
			itemID: @ID

		@sendData = (action)->
			dataToSend.user_action = action
			$.post @analyticsClient, dataToSend
			return @






			
		@attachOpeningEvents()	
		@attachMiscEvents()	
		return @

