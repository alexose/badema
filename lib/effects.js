$(document).ready(function(){
    $("#money-slider").slider()
    sizeStuff();
});

$(window).resize(function(){
    sizeStuff();
});

function sizeStuff(){
    var width = $('#map').innerWidth();
    console.log(width);
    var fontSize = width*0.00048828125;
    $('html').css({'font-size': fontSize + 'em'});
}
