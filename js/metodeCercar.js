// Direcció on feim la consulta
var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var tags = ""; // Variable on guardam totes les tags que volem cercar.

// Funció que ens detecta si pitjam intro al "input" de "tags."
function validar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) loadPhoto(tags);
}

// Funció que fa la consulta amb les "tags" i el "tagmode" triades i construeix el codi html amb la resposta.
function loadPhoto(str) {
    console.log("Word added: "+str);
    //Cambiam els espais(" ") per comes(",").
    str = str.replace(/ /g,",");
    console.log("Tags: "+str);
    //Eliminam el contigut del "div" on mostram la resposta.
    $("#images").empty();
    $.getJSON( flickerAPI, {
        tags: str,
        tagmode: $("#tagSelector").val(),
        format: "json"
    })
    .done(function( data ) {
        console.log(data);
        $.each( data.items, function( i, item ) {
            $('<div class="card"><a href="'+item.link+'"><img class="card-img-top" src="'+item.media.m+'" alt="Card image cap"></a><div class="card-body"><h5 class="card-title">'+item.title+'</h5></div><ul class="list-group list-group-flush"><li class="list-group-item">Autor: <b>'+item.author.substring(20,(item.author.length-2))+'</b></li><li class="list-group-item">Etiquetes:<div class="text-justify"><i>'+item.tags+'</i></div></li></ul><div class="card-body"><a href="'+item.link+'" class="card-link">Enllaç cap a la pàgina de Flickr</a></div><div class="card-footer"><small class="text-muted">Data de publicació: '+item.published+'</small></div></div>').appendTo( "#images" );
        });
    });
};

$(document).ready(function(){
    //Funció per agafar les dades del "input" de "tags".
    $(document).on('input', "#tags", function () {
        //Al mateix temps que s'escriu anam agafant les dades.
        tags = $("#tags").val();
        //Quan esta buit no mostram cap resposta.
        if (tags == ""){
            $("#images").empty();
        }
        //Si ficam espai ja anam mostrant els resultats de les etiquetes que tenim.
        if (tags.endsWith(" ")){
            loadPhoto(tags);
        }
    });
    
    //Funció per triar el tipus de "tagMode".
    $(document).on('input', "#tagSelector", function () {
        console.log("Changed tagSeclector");
        //Si tenim "tags" actualitzam el resultat.
        if (tags.length > 0){
            loadPhoto(tags);
        }
    });  
});