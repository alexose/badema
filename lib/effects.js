$(document).ready(function(){
    $("#money-slider").slider({
      from: 5,
      to: 50,
      step: 2.5,
      round: 1,
      onstatechange: function(e){
         $('#overlay-money .readout').text(e);
      }
    });
    sizeStuff();

    var dialog = $('#dialog');

    $('#dialog-close').click(function(e){
        dialog.hide();
    });

    $('#receipt').click(function(e){
        var output = $("<ul />");
        
        for (i in L.localData.features){
            output.append('<li>' + i + '</li>');
        }

        dialog
            .html(output)
            .show();
    });

    function addGeojson(id) {
        $.getJSON("http://sourcemap.com/services/supplychains/"+id+"?f=geojson", function(data) {
            L.localData = data;
            var linetype = $("#linetype option:selected").val();
            if(linetype != "st") {	 
                for (var i = 0, len = data.features.length; i < len; i++) {
                    var npoints = 100;
                    if(data.features[i].geometry.type == "LineString") {
                        var from = data.features[i].geometry.coordinates[0];
                        var to = data.features[i].geometry.coordinates[1];

                        data.features[i].geometry.type = "MultiLineString";
                        if(linetype == "gc"){
                            var gc = new arc.GreatCircle({'x' : from[0], 'y' : from[1]},{'x' : to[0], 'y': from[1]});
                            var multipass = gc.Arc(npoints);
                        }
                        var points = [];
                        for (i=0;i<npoints;i++){
                            var c = multipass.coords[i];
                            points.push(new L.LatLng(c[1], c[0]));
                        }
                        data.features[i].geometry.coordinates = points;
                    }
                }
            }
            
            var geojsonLayer = new L.GeoJSON(null, {});		
            geojsonLayer.on("featureparse", function (e) {
                var title = "Unnamed."
                if(typeof(e.properties.title) != 'undefined') {
                    title = e.properties.title;
                }
                var description = ""
                if(typeof(e.properties.description) != 'undefined') {
                    description = e.properties.description;
                }
            
                var popupContent = "<h2>"+title+"</h2><p>"+description+"</p>";
                if (e.properties && e.properties.popupContent) {
                    popupContent += e.properties.popupContent;
                }
                e.layer.bindPopup(popupContent);
                if (e.properties && e.properties.style && e.layer.setStyle) {
                    e.layer.setStyle(e.properties.style);
                }
            });
            map.addLayer(geojsonLayer);
            geojsonLayer.addGeoJSON(data);
            geojsonLayer.setStyle({
                "color": "#237FD0",
                "weight": 3,
                "opacity": 0.4
            });
            
            var maptitle = '';

            layersControl.addOverlay(geojsonLayer, data.properties.title);
        });			
    }	
    
    var map = new L.Map('map');
    
    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/22677/256/{z}/{x}/{y}.png';
    var cloudmadeAttribution = 'Base data &copy; OSM contributors, Imagery &copy; CloudMade';
    var cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
    
    var bluemarbleUrl = 'http://{s}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-bathy-jul-bw/{z}/{x}/{y}.png';
    var bluemarbleAttribution = 'NASA Blue Marble Topography from MapBox';
    var bluemarble = new L.TileLayer(bluemarbleUrl, {maxZoom: 8, attribution: bluemarbleAttribution});
        
    map.setView(new L.LatLng(0, 0), 2).addLayer(bluemarble).addLayer(cloudmade);
    var baseMaps = {
        "Cloudmade": cloudmade,
        "Bluemarble": bluemarble				
    };
    var layersControl = new L.Control.Layers(baseMaps, null);        
    map.addControl(layersControl);
    
    $("#maptrigger").click(function() {
        addGeojson($("#smapid").val());
    });

    // Add data overlay layers
    var solarLayer = new L.TileLayer.WMS('http://ec2-23-21-2-183.compute-1.amazonaws.com:8080/geoserver/gwc/service/wms',{
        layers: 'cleanweb:net_radiation_rgb_201106',
        format: 'image/png',
        transparent: true,
        opacity: 0.6,
        attribution: "Weather data Â© 2012 IEM Nexrad"
    }); 
    layersControl.addOverlay(solarLayer, "Dat Solar Data");

    map.attributionControl.setPrefix('<a href="http://www.sourcemap.com">Powered by Sourcemap</a> (Using Leaflet)');
    map.setView(new L.LatLng(0, 0), 2).locate({setView: true, maxZoom: 2});
    addGeojson($("#smapid").val());
});

$(window).resize(function(){
    sizeStuff();
});

function sizeStuff(){
    var width = $('#map').innerWidth();
    var fontSize = width*0.00048828125;
    $('html').css({'font-size': fontSize + 'em'});
}
