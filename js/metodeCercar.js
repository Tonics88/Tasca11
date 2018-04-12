var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var tags="";


function loadPhoto(str) {
    console.log("Word added: "+str);
    str=str.replace(/ /g,",");
    console.log("Tags: "+str);
    $("#images").empty();
    $.getJSON( flickerAPI, {
      tags: str,
      tagmode: $("#tagSelector").val(),
      format: "json"
    })
      .done(function( data ) {
        console.log(data);
        $.each( data.items, function( i, item ) {
          $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        //   if ( i === 3 ) {
        //     return false;
        //   }
        });
      });
  };

$(document).ready(function(){
    $(document).on('input', "#tags", function () {
        tags = $("#tags").val();//"mount rainier girl";
        if (tags==""){
            $("#images").empty();
        }
        if (tags.endsWith(" ")){
            loadPhoto(tags);
        }
    });

    $(document).on('input', "#tagSelector", function () {
        console.log("change tagSeclector");
        if (tags.length > 0){
            loadPhoto(tags);
        }
    });

});