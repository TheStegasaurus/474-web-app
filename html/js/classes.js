/* global $ */

var URL = 'https://seeds-jad006.c9users.io:8081/';

function start() {
alert("WHJAT");
  $.ajax({
    url: URL,
    method: 'GET'
  })
  .done(setClasses)
  .fail(displayError);
}


$(document).ready(function() {

//The search function
  $("#submit_btn").click(function(e) {

     //$("#major_text").append('<!-- TEST -->');
//    $("#major_text").append('<div id="load_animation" class="loader"></div>');
//alert("DSADSAD");
//    $("#load_animation").remove();//.removeClass("loader");//.append('<div class="loader"></div>');

    var search_term = $("#txtSearch").val();

    removeList();
    
    if (search_term != "") {
      $.ajax({
        url: URL + "classes/" + search_term,
        method: 'GET'
      })
      .done(setClasses)
      .fail(displayError);
    }
  });
  

//The on-click function for the class list
$("#major_text").on('click','li',function (){
  var id = $(this).attr('name').split(" ");
   // alert(id[0] + " " + id[1]);
    
    $.ajax({
      url: URL + "class/" + id[0] + "/" + id[1],
      method: 'GET'
    })
    .done(updateClassInfo)
    .fail(displayError);

});
  
  
});

//Updates the right side with info
function updateClassInfo (info) {
  document.getElementById("class_info").innerHTML= info;
}

//Removes the list of items on the left
function removeList() {
  $('#class_list li').each(function () { // loops through all li
      $(this).remove(); // Remove li one by one
  });
}

//Sets the bullets to contain the info from the search
function setClasses (classes) {
    $.each(classes, function(index, item) {
      $("#class_list").append('<li name="' + item.Prefix + ' ' + item.Code + '">' + item.Prefix + ' ' + item.Code + '. ' + item.Name + '. ' + item.Credits + '</li>');
    });
}

function displayError (err) {
  alert(JSON.stringify(err));
}

//$(start);