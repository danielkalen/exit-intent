browserInfo = import './browserInfo'
$ = window.jQuery

export open = ()->
	@popup.open()
	@isOpen = true
	@disabled = true
	@detachOpeningEvents()

export close = ()->
	@popup.close()
	@isOpen = false

export emit = (event)->
	@el.trigger(event)
	@popup.emit(event)

export replaceWith = ($newForm)->
	@popup.replaceWith($newForm)
	@attachMiscEvents()



		

export attachOpeningEvents = ()->
	###*
	# Opens the popup if the user's mouse moves from the inside of the viewport
	# to outside of the viewport's Y axis.
	###
	unless browserInfo.isMobile # No need to attach for mobile devices
		base = if browserInfo.isIE or browserInfo.isIE11 or browserInfo.isEdge then 110 else 0
		threshold = @options.threshold + base
		$(document).on "mouseleave.#{@name}", (event)=>
			return if @disabled or Popup::isOpen or event.relatedTarget
			if event.clientY <= threshold
				@open()
				@emit 'mouseopen'


	###*
	# Opens the popup if the user's tries to navigate backwards. We apply a trick
	# to the window.history property using its replaceState() and pushState() methods
	# to register the previous page in the browser's history as the current page. We
	# then listen to the popstate event which triggers when the page navigates away.
	# Since IE doesn't fully support these methods, we disable them completely for IE.
	###
	unless browserInfo.isIE or browserInfo.isIE11 or browserInfo.isMobile or @disabled or @isOpen
		window.history.replaceState {id: 'exit-init'}, '', ''
		window.history.pushState {id: 'exit-control'}, '', ''
		
		$(window).on 'popstate', (e)=>
			if !@disabled and 'state' of window.history and window.history.state isnt null and window.history.state.id != 'exit-control'
				@open()
				@emit 'historyopen'
			else
				window.history.back()






export attachMiscEvents = ()->
	@el.find('.no').on "click.#{@name}", ()=>
		@close()
		try localStorage.setItem 'exit_intent-complete', 'true'


	@el.find('.submit').on "click.#{@name}", ()=>
		@emit 'submitted'


	@el.find('.step').first().find('.next').on "click.#{@name}", ()=>
		@emit 'continued'




export detachEvents = ()->
	@el.find('.no').off "click.#{@name}"
	@el.find('.submit').off "click.#{@name}"
	@el.find('.step').first().find('.next').off "click.#{@name}"
	@detachOpeningEvents()

export detachOpeningEvents = ()->
	$(document).off "mouseleave.#{@name}"
