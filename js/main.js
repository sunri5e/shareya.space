function custAddClass(el, mod){
	$(el).addClass(mod);
}

function custRemoveClass(el, mod){
	$(el).removeClass(mod);
}

function showAllDays() {
	$('.sy-av-section').show();
}

$(document).ready(function() {
	if ($('.sy-header').length) {
		$('body').addClass('with-header');
	}
	if ($('.sy-footer').length) {
		$('body').addClass('with-footer');
	}


	$('.sy-overlay, .sy-overlay-close').on('click', function(e){
		e.stopPropagation();
		if (e.target == this) {
			custRemoveClass('.sy-overlay', 'is-opened');
    }
	});

  $("#datepicker").datepicker({
    prevText: '<i class="zmdi zmdi-chevron-left"></i>',
    nextText: '<i class="zmdi zmdi-chevron-right"></i>',
    beforeShowDay: $.datepicker.noWeekends,
    beforeShow: function(){
    	custAddClass('.sy-overlay', 'is-opened');
    },
    altField: "#alternate",
    altFormat: "d MM ("+ 5 +" available)",
    dateFormat: "yy-mm-dd",
    onClose: function(){
    	custRemoveClass('.sy-overlay', 'is-opened');
    	custAddClass('.sy-filter--query', 'is-visibale');
    	showAllDays()
    	$('.sy-av-section:not([data-day="'+$("#datepicker").val()+'"])').hide();
    }
  });
  $('.sy-filter--clear-query').on('click', function(){
    custRemoveClass('.sy-filter--query', 'is-visibale');
  	$("#datepicker").datepicker( "setDate", "" );
  	showAllDays();
  });
  $('#sharing-calendar').multiDatesPicker({
  	prevText: '<i class="zmdi zmdi-chevron-left"></i>',
    nextText: '<i class="zmdi zmdi-chevron-right"></i>'
  });

  $('.sy-multiselect-item label').on('click', function(e){
  	if ($(this).parent().hasClass('is-already-booked')) {
  		e.preventDefault();
  		custAddClass('.sy-overlay', 'is-opened');
  	}
  });
});








