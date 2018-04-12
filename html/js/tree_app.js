/* global $ */

var URL = 'https://seeds-jad006.c9users.io:8081/';

var fs = require('fs');
$(document).ready(function() {

//The search function
  $("#submit_btn").click(function(e) {

    var search_term = $("#txtSearch").val();

    if (search_term != "") {
      $.ajax({
        url: URL + "prereq/" + search_term,
        method: 'GET'
      })
      .done(gentree)
      .fail(displayError);
    }
  });


});
  
//Generate tree data from   
function gentree(json){
    
    var final = [];
    var k=0;
    for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        var clss = '{"name": "'+obj.Prefix + ' ' + obj.Code + '"}';    
        if(!final.includes(clss)){
            final[k]=clss;
            k++;
        }
    }
    
    for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        var clss = '{"name": "'+obj.req_prefix + ' ' + obj.req_code + '"}';    
        if(!final.includes(clss)){
            final.push(clss);
        }
    }
    
    final.sort();
    
    var links = [];
    for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        var clss = '{"name": "'+obj.req_prefix + ' ' + obj.req_code + '"}';
        var clss2 = '{"name": "'+obj.Prefix + ' ' + obj.Code + '"}';
        var source = '{"source": '+ final.indexOf(clss) + ',';
        var dest = '"target": '+ final.indexOf(clss2) + '}';     
        var link = source + dest;
        if(!links.includes(link)){
            links.push(link);
        }
    }
    
    
    links.sort();
    
    var finaljson = '{"nodes":['+final+'],"links":['+links+']}';

   // fs.writeFile("../graph.json", finaljson);
   // window.location.reload();
    console.log(finaljson);
}



function displayError (err) {
  alert(JSON.stringify(err));
}

//$(start);