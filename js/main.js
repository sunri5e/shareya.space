$(document).ready(function(){
  $('.cw-articles-nav--cat').on('click', function(e){
    e.preventDefault();
    $(this).parent().find('ul').slideToggle();
    $(this).toggleClass('open');
  });
});