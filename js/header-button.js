$(document).ready(function() {
  $('#js-select-sunset-header-button').on('click', function() {
    $('#js-select-sunset-header-button').fadeOut(100);
    $('#sunrise-left').fadeOut(1, function() {
      $('#sunset-left').fadeIn(2500, function() {
        $('#js-select-sunrise-header-button').fadeIn(1000);
      });
    });
  });
  $('#js-select-sunrise-header-button').on('click', function() {
    $('#js-select-sunrise-header-button').fadeOut(100);
    $('#sunset-left').fadeOut(1, function() {
      $('#sunrise-left').fadeIn(2500, function() {
        $('#js-select-sunset-header-button').fadeIn(1000);
      });
    });
  });
});
