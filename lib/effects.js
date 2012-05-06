$(document).ready(function(){
    $("#money-slider").slider({
      from: 5,
      to: 1000,
      step: 2.5,
      round: 1,
      onstatechange: function(e){
         $('#overlay-money .readout').text(e);
      }
    });
    sizeStuff();

    var dialog = $('#dialog');
    var dialogContent = $('#dialog-inner');

    $('#dialog-close').click(function(e){
        dialog.hide();
    });

    $('#map, #overlay').click(function(e){
        // allow dialog clickoff
        dialog.hide();
    });

    $(window).resize(function(){
        sizeStuff();
    });

    function sizeStuff(){
        var width = $('#map').innerWidth();
        var fontSize = width*0.00048828125;
        $('html').css({'font-size': fontSize + 'em'});
    }

    $('#receipt').click(function(e){
        var output = $("<table class='receipt' />");

        for (i in L.localData.features){
            ftr = L.localData.features[i];
            props = ftr.properties;
            row = $('<tr />');
            row.append('<td>' + i + '</td>');
            row.append('<td>' + props.title + '</td>');
            row.append('<td>' + props.address + '</td>');
            output.append(row);
        }

        dialog.show();
        dialogContent.html(output);
    });

    var em = {
        "North America": [842.72892,1120560.478,29158.24518],
     "Bermuda": [0,0,0],
     "Canada": [360.249,52497.5785,2935.73595],
     "Greenland": [0,0,0],
     "Mexico": [46.0115,19767.74961,2134.50923],
     "Saint Pierre and Miquelon": [0,0,0],
     "United States": [436.46842,1048295.15,24088],
     "Central & South America": [0,49738.8459,4854.04838],
     "Antarctica": [0.004,0,0],
     "Antigua and Barbuda": [0,0,0],
     "Argentina": [0,1828.73455,1528.78635],
     "Aruba": [0.1,0,0],
     "Bahamas, The": [0,0,0],
     "Barbados": [0,0,1.03],
     "Belize": [0,0,0],
     "Bolivia": [0,0,96.0568],
     "Brazil": [429.6742,25370.79825,889.938],
     "Cayman Islands": [0,0,0],
     "Chile": [25.981,8558.3454,187.80517],
     "Colombia": [40.465,5576.59317,320.6602],
     "Costa Rica": [0,114.64038,0],
     "Cuba": [0.6257,37.47859,40.61225],
     "Dominica": [0,0,0],
     "Dominican Republic": [1.4645,977.40846,28.9583],
     "Ecuador": [8.95304,0,11.65395],
     "El Salvador": [0,0,0],
     "Falkland Islands (Islas Malvinas)": [0.002,0,0],
     "French Guiana": [0.01,0,0],
     "Grenada": [0,0,0],
     "Guadeloupe": [0.15,0,0],
     "Guatemala": [0,1250.02108,0],
     "Guyana": [0,0,0],
     "Haiti": [0,0,0],
     "Honduras": [0,126.76581,0],
     "Jamaica": [0,13.22774,0],
     "Martinique": [0.002,0,0],
     "Montserrat": [0,0,0],
     "Netherlands Antilles": [0.06,0,0],
     "Nicaragua": [1.149,71.65024,0],
     "Panama": [0,66.13868,0],
     "Paraguay": [0,0.31967,0],
     "Peru": [19.76605,1165.14311,191.05415],
     "Puerto Rico": [0,1653.46704,27.153],
     "Saint Kitts and Nevis": [0,0,0],
     "Saint Lucia": [0,0,0],
     "Saint Vincent/Grenadines": [0,0,0],
     "Suriname": [0,0,0],
     "Trinidad and Tobago": [0.02,1.10231,779.7552],
     "Turks and Caicos Islands": [0,0,0],
     "Uruguay": [0,2.57941,2.8252],
     "Venezuela": [76.01,2924.43204,747.75981],
     "Virgin Islands,  U.S.": [0,0,0],
     "Virgin Islands, British": [0,0,0],
     "Europe": [0,957420.2475,20637.59159],
     "Albania": [0,46.29708,1.05945],
     "Austria": [44.0589,5093.78079,334.99809],
     "Belgium": [7.3,3287.09247,716.29415],
     "Bosnia and Herzegovina": [0,11789.21999,7.41615],
     "Bulgaria": [0,35611.27078,76.63355],
     "Croatia": [0,2217.85046,100.25929],
     "Cyprus": [0,9.9208,0],
     "Czech Republic": [5.725,54866.44561,327.7232],
     "Denmark": [12.286,7185.96775,174.70331],
     "Faroe Islands": [0.08034,0,0],
     "Finland": [23.469,8110.80698,166.2277],
     "Former Czechoslovakia": [0,0,0],
     "Former Serbia and Montenegro": [0,0,0],
     "Former Yugoslavia": [0,0,0],
     "France": [78.526,20020.17891,1699.00465],
     "Germany": [104.232,255746.1562,3437.17364],
     "Germany, East": [0,0,0],
     "Germany, West": [0,0,0],
     "Gibraltar": [0,0,0],
     "Greece": [8.946,61136.39262,134.51484],
     "Hungary": [3.097,11802.44773,425.61638],
     "Iceland": [16.766,126.76581,0],
     "Ireland": [3.4314,2104.31239,201.40145],
     "Italy": [76.186,22852.01679,2930.47402],
     "Luxembourg": [0.3023,113.53807,48.16966],
     "Macedonia": [0,7710.66796,2.8252],
     "Malta": [0.002,0,0],
     "Montenegro": [0,1631.42081,0],
     "Netherlands": [12.241,13785.50586,1937.52216],
     "Norway": [117.671,1374.58227,203.4144],
     "Poland": [10.5885,148870.456,607.31206],
     "Portugal": [27.573,2976.24067,182.04883],
     "Romania": [19.967,35913.30409,454.50405],
     "Serbia": [0,42085.1454,79.8119],
     "Slovakia": [6.067,7710.66796,221.10722],
     "Slovenia": [4.851,5640.52723,37.4339],
     "Spain": [94.093,18497.88692,1265.15988],
     "Sweden": [83.312,4338.69751,59.082],
     "Switzerland": [38.4705,271.16859,130.02983],
     "Turkey": [55.118,109120.0061,1346.17249],
     "United Kingdom": [26.252,55373.50883,3329.4982],
     "Eurasia": [0,439185.0965,21005.30903],
     "Armenia": [0,66.13868,61.09495],
     "Azerbaijan": [0,0,350.36012],
     "Belarus": [0,83.77566,770.5733],
     "Estonia": [0.993,19763.34036,24.75582],
     "Former U.S.S.R.": [0,0,0],
     "Georgia": [0,256.83855,58.26975],
     "Kazakhstan": [6.471,86862.13513,303.24991],
     "Kyrgyzstan": [0,759.49253,16.33319],
     "Latvia": [3.585,143.30048,53.6788],
     "Lithuania": [0,337.30728,109.4765],
     "Moldova": [0,176.36982,76.63355],
     "Russia": [167.465,256795.5566,14960.8466],
     "Tajikistan": [0,221.56458,7.98119],
     "Turkmenistan": [0,0,720.426],
     "Ukraine": [12.885,69803.86684,1877.3454],
     "Uzbekistan": [0,3915.40995,1614.28397],
     "Middle East": [0,15413.61974,13244.9967],
     "Bahrain": [0.002,22.04623,432.60875],
     "Iran": [9.685,1967.62578,5105.8427],
     "Iraq": [0,0,45.9095],
     "Israel": [0.0933,13032.6272,128.89975],
     "Jordan": [0,0,96.7631],
     "Kuwait": [0,0,445.78125],
     "Lebanon": [0,322.97723,0],
     "Oman": [0,0,618.7188],
     "Palestine": [0,0,0],
     "Qatar": [0,2.20462,769.867],
     "Saudi Arabia": [0,61.72944,3095.7129],
     "Syria": [0,4.40925,340.08345],
     "United Arab Emirates": [0.02,0,2137.9701],
     "Yemen": [0,0,26.8394],
     "Africa": [0,217208.2488,3553.64251],
     "Algeria": [0,434.31068,1017.7783],
     "Angola": [0,0,25.8859],
     "Benin": [0,0,0],
     "Botswana": [0,816.81272,0],
     "Burkina Faso": [0,0,0],
     "Burundi": [0,0,0],
     "Cameroon": [0,0,0.7063],
     "Cape Verde": [0.007,0,0],
     "Central African Republic": [0,0,0],
     "Chad": [0,0,0],
     "Comoros": [0,0,0],
     "Congo (Brazzaville)": [0,0,32.84295],
     "Congo (Kinshasa)": [0,376.99048,0],
     "Cote dIvoire (IvoryCoast)": [0,0,56.504],
     "Djibouti": [0,0,0],
     "Egypt": [15.2102,1000.89871,1630.1404],
     "Equatorial Guinea": [0,0,55.7977],
     "Eritrea": [0.002,0,0],
     "Ethiopia": [0,0,0],
     "Gabon": [0,0,2.8252],
     "Gambia, The": [0,0,0],
     "Ghana": [0,0,4.2378],
     "Guinea": [0,0,0],
     "Guinea-Bissau": [0,0,0],
     "Kenya": [0,113.53807,0],
     "Lesotho": [0,0,0],
     "Liberia": [0,0,0],
     "Libya": [0,0,241.69586],
     "Madagascar": [0,11.02311,0],
     "Malawi": [0,71.65024,0],
     "Mali": [0,0,0],
     "Mauritania": [0,0,0],
     "Mauritius": [0,540.13257,0],
     "Morocco": [4.0681,3451.33687,20.12955],
     "Mozambique": [0,36.37627,2.8252],
     "Namibia": [1.235,157.63052,0],
     "Niger": [0,198.41604,0],
     "Nigeria": [0,8.81849,175.51555],
     "Reunion": [0,0,0],
     "Rwanda": [0,0,0],
     "Saint Helena": [0,0,0],
     "Sao Tome and Principe": [0,0,0],
     "Senegal": [0,345.02346,1.76575],
     "Seychelles": [0,0,0],
     "Sierra Leone": [0,0,0],
     "Somalia": [0,0,0],
     "South Africa": [0,206192.8514,141.61315],
     "Sudan and South Sudan": [0,0,0],
     "Swaziland": [0,251.32699,0],
     "Tanzania": [0,104.71958,27.5457],
     "Togo": [0,0,0],
     "Tunisia": [0,0,115.8332],
     "Uganda": [0,0,0],
     "Western Sahara": [0,0,0],
     "Zambia": [0,1.10231,0],
     "Zimbabwe": [0,3095.2903,0],
     "Asia & Oceania": [0,5195176.661,20465.89006],
     "Afghanistan": [0,38.5809,1.05945],
     "American Samoa": [0,0,0],
     "Australia": [18.208,145155.6668,1141.45143],
     "Bangladesh": [0,1984.16045,710.89095],
     "Bhutan": [0,90.38953,0],
     "Brunei": [0,0,104.88555],
     "Burma (Myanmar)": [0,1115.5391,116.18635],
     "Cambodia": [0,0,0],
     "China": [764.54,3695377.579,3768.46365],
     "Cook Islands": [0.00013,0,0],
     "Fiji": [0.4541,13.22774,0],
     "French Polynesia": [0,0,0],
     "Guam": [0,0,0],
     "Hawaiian Trade Zone": [0,0,0],
     "Hong Kong": [0.001,11380.26248,141.9663],
     "India": [132.364,721986.3827,2277.46435],
     "Indonesia": [19.8862,54228.20733,1460.27525],
     "Japan": [102.837,205983.4122,3718.10446],
     "Kiribati": [0,0,0],
     "Korea, North": [0,30349.93866,0],
     "Korea, South": [6.265,125575.3101,1514.62504],
     "Laos": [3.229,442.02686,0],
     "Macau": [0,0,0],
     "Malaysia": [9.33501,21322.00863,1144.9123],
     "Maldives": [0.0001,0,0],
     "Mongolia": [0.0024,9495.31005,0],
     "Nauru": [0,0,0],
     "Nepal": [0,369.27431,0],
     "New Caledonia": [0,330.69341,0],
     "New Zealand": [32.1923,3513.61746,147.22824],
     "Niue": [0,0,0],
     "Pakistan": [27.995,11588.59932,1399.53345],
     "Papua New Guinea": [0,0,3.88465],
     "Philippines": [17.237,18193.64899,101.0009],
     "Samoa": [0,0,0],
     "Singapore": [0.1,390.21822,296.646],
     "Solomon Islands": [0,0,0],
     "Sri Lanka": [0,210.54147,0],
     "Taiwan": [0,71374.97028,535.3754],
     "Thailand": [11.335,38947.96727,1592.0002],
     "Timor-Leste (East Timor)": [0,0,0],
     "Tonga": [0,0,0],
     "U.S. Pacific Islands": [0,0,0],
     "Vanuatu": [0,0,0],
     "Vietnam": [27.425,25719.12864,289.93615],
     "Wake Island": [0,0,0],
     "World": [0,7994703.198,112919.7234]
        
    };


    function addGeojson(id) {
        $.getJSON("http://10.1.10.89/services/geospatial/intersection?attribute=name&supplychain_id="+id+"&set_id=23", 	function(data) {		
            var new_object = {};
            for (var i in data.response.stops) {
                if (data.response.stops[i].results.name.length != 0) {
                    new_object[data.response.stops[i].attributes.address] = data.response.stops[i].results.name[0];
                } else {
                    new_object[data.response.stops[i].attributes.address] = "";
                }
            }

                            
        $.getJSON("http://10.1.10.89/services/supplychains/"+id+"?f=geojson", function(data) {	
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
                var isdata = new_object;
                for (var i = 0, len = data.features.length; i < len; i++) {
                    if (data.features[i].properties) {
                        if (data.features[i].properties.address) {
                            // You have country
                            // iterate or query through the array to find the mix
                            data.features[i].country = new_object[data.features[i].properties.address];
                            if (em[data.features[i].country]) {
                                    data.features[i].properties.coal = em[data.features[i].country][1];
                                    data.features[i].properties.naturalgas = em[data.features[i].country][2];
                                    data.features[i].properties.renewables = em[data.features[i].country][0];
                            }									
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
                    var renewables = 0;
                    if(typeof(e.properties.renewables) != 'undefined') {
                        renewables = e.properties.renewables;
                    }
                    var coal = ""
                    if(typeof(e.properties.coal) != 'undefined') {
                        coal = e.properties.coal;
                    }
                    var naturalgas = ""
                    if(typeof(e.properties.naturalgas) != 'undefined') {
                        naturalgas = e.properties.naturalgas;
                    }					
                    var popupContent = "<h2>"+title+"</h2><p>"+description+"</p>"
                    + "<p>Coal: "+coal+ " Short Tons <br />"
                    + "Natural Gas: "+naturalgas+ " BTUS <br />"
                    + "Renewables: "+renewables+ " kwH <br />"
                    + "</p>";
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
        });		
    }

    function pointQuery(x,y,map) {
        var popup = new L.Popup({maxWidth: 400});
        var latlng = new L.LatLng(0,0);
        var BBOX = map.getBounds()._southWest.lng+","+map.getBounds()._southWest.lat+","+map.getBounds()._northEast.lng+","+map.getBounds()._northEast.lat;
        var WIDTH = map.getSize().x;
        var HEIGHT = map.getSize().y;
        var X = 10;
        var Y = 10;
        var URL = '/geoserver/wms&REQUEST=GetFeatureInfo&LAYERS=cleanweb:net_radiation_rgb_201106&QUERY_LAYERS=cleanweb:net_radiation_rgb_201106&STYLES=&BBOX='+BBOX+'&FEATURE_COUNT=5&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&FORMAT=image%2Fpng&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A4326&X='+X+'&Y='+Y;
        popup.setLatLng(latlng);
        popup.setContent("<iframe src='"+URL+"' width='300' height='100' frameborder='0'><p>Your browser does not support iframes.</p></iframe>");
        map.openPopup(popup);
        console.log(popup);
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
    var solarLayer = new L.TileLayer.WMS('/geoserver/wms',{
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
    pointQuery(0,0, map);
});


