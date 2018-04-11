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
  if (info[0].Description == "")
    info[0].Description = "No description found";
  
  document.getElementById("class_description").innerHTML= info[0].Description;
  document.getElementById("class_title").innerHTML= info[0].Name;
  document.getElementById("class_program").innerHTML= info[0].Program;
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
      var code = '<li name="' + item.Prefix + ' ' + item.Code + '">';
      
      if (item.Not_offered != null) {
        code = code + '<font title="This class has not been offered in a while" color="#808080">';
      }
      
      //The extra font tag doesnt get cleaned up cause im lazy
      code = code + '<u>' + item.Prefix + ' ' + item.Code + '</u>: ' + item.Name + '. ' + item.Credits + "</font>";
      
      if (item.Fills != null) {
        code = code + ' <img src="exclamation-mark.png" alt="Mountain View" title="This class tends to fill up!">';
      }
      
      code = code + '</li>';
      $("#class_list").append(code);
    });
}

function displayError (err) {
  alert(JSON.stringify(err));
}

//$(start);