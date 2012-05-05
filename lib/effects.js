$(document).ready(function(){
    $("#money-slider").slider({
      from: 5,
      to: 50,
      step: 2.5,
      round: 1,
    });
    sizeStuff();
});

$(window).resize(function(){
    sizeStuff();
});

function sizeStuff(){
    var width = $('#map').innerWidth();
    var fontSize = width*0.00048828125;
    $('html').css({'font-size': fontSize + 'em'});
}
