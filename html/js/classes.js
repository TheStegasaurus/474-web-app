/* global $ */

var URL = 'https://seeds-jad006.c9users.io:8081/classes/';

function start() {
alert("WHJAT");
  $.ajax({
    url: URL,
    method: 'GET'
  })
  .done(getClasses)
  .fail(displayError);
}


$(document).ready(function() {
  $("#submit_btn").click(function(e) {

     //$("#major_text").append('<!-- TEST -->');
//    $("#major_text").append('<div id="load_animation" class="loader"></div>');
//alert("DSADSAD");
//    $("#load_animation").remove();//.removeClass("loader");//.append('<div class="loader"></div>');
    var search_term = $("#txtSearch").val();

    removeList();
    
    if (search_term != "") {
      $.ajax({
        url: URL + search_term,
        method: 'GET'
      })
      .done(getClasses)
      .fail(displayError);
    }
  });
});


function removeList() {
  $('#class_list li').each(function () { // loops through all li
      $(this).remove(); // Remove li one by one
  });
}

function getClasses (classes) {
    $.each(classes, function(index, item) {
      $("#class_list").append('<li>' + item.Prefix + ' ' + item.Code + '. ' + item.Name + '. ' + item.Credits + '</li>');
    });
}

function displayError (err) {
  alert(JSON.stringify(err));
}

//$(start);