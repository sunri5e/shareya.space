function custAddClass(el, mod) {
  $(el).addClass(mod);
}

function custRemoveClass(el, mod) {
  if (typeof(mod) == 'string') {
    $(el).removeClass(mod);
  } else if (mod.constructor === Array) {
    for (let i = 0; i < mod.length; i++) {
      $(el).removeClass(mod[i]);
    }
  }
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


  $('.sy-overlay, .sy-overlay-close').on('click', function(e) {
    e.stopPropagation();
    if (e.target == this) {
      custRemoveClass('.sy-overlay', ['is-opened', 'is-opened-for-sidebar']);
    }
    if ($('.sy-sidebar') && $('.sy-sidebar').hasClass('is-opened')) {
      custRemoveClass('.sy-sidebar', 'is-opened');
    }
    if ($('.sy-modal') && $('.sy-modal').hasClass('is-opened')) {
      custRemoveClass('.sy-modal', 'is-opened');
    }
  });

  $("#datepicker").datepicker({
    prevText: '<i class="zmdi zmdi-chevron-left"></i>',
    nextText: '<i class="zmdi zmdi-chevron-right"></i>',
    beforeShowDay: $.datepicker.noWeekends,
    beforeShow: function() {
      custAddClass('.sy-overlay', 'is-opened');
    },
    altField: "#alternate",
    altFormat: "d MM (" + 5 + " available)",
    dateFormat: "yy-mm-dd",
    onClose: function() {
      custRemoveClass('.sy-overlay', 'is-opened');
      custAddClass('.sy-filter--query', 'is-visibale');
      showAllDays()
      $('.sy-av-section:not([data-day="' + $("#datepicker").val() + '"])').hide();
    }
  });
  $('.sy-filter--clear-query').on('click', function() {
    custRemoveClass('.sy-filter--query', 'is-visibale');
    $("#datepicker").datepicker("setDate", "");
    showAllDays();
  });
  $('#sharing-calendar').multiDatesPicker({
    prevText: '<i class="zmdi zmdi-chevron-left"></i>',
    nextText: '<i class="zmdi zmdi-chevron-right"></i>'
  });

  $('.sy-multiselect-item label').on('click', function(e) {
    if ($(this).parent().hasClass('is-already-booked')) {
      e.preventDefault();
      custAddClass('.sy-overlay', 'is-opened');
      custAddClass($('.sy-modal[data-booked]'), 'is-opened');
    }
  });

  $('.sy-menu-toogle').on('click', function(e){
    e.preventDefault();
    if ($('.sy-sidebar').toggleClass('is-opened'));
    custAddClass('.sy-overlay', 'is-opened-for-sidebar');
  });

  $("[data-checkall]").change(function () {
      $('#' + $(this).data('related') + ' input:checkbox').prop('checked', $(this).prop("checked"));
  });
});
