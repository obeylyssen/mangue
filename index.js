/**
 * This example uses pulsating circles CSS by Kevin Urrutia
 * http://kevinurrutia.tumblr.com/post/16411271583/creating-a-css3-pulsating-circle
 */

var map = AmCharts.makeChart("chartdiv", {
    type: "map",
    "theme": "light",
    pathToImages: "http://www.amcharts.com/lib/3/images/",



    zoomControl: {
        buttonFillColor: "#15A892"
    },

    areasSettings: {
        unlistedAreasColor: "#15A892"
    },

    dataProvider: {
        map: "worldLow",
        images: [{
            zoomLevel: 5,
            scale: 0.5,
            title: "München",
            latitude: 48.132689,
            longitude: 11.568615,
            label:"Opti",
            labelShiftX:8,
            labelColor:"#fff601",
            labelFontSize:20,
            balloonText: "[[description]]",
            description:"Voici un message important"
            
        },  {
            zoomLevel: 5,
            scale: 0.5,
            title: "Paris",
            latitude: 48.8567,
            longitude: 2.3510,
            label:"SILMO",
            labelShiftX:-5,
           labelPosition:"left",
            labelColor:"#fff601",
            labelFontSize:20
            
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Milan",
            latitude: 45.466466,
            longitude: 9.182539
        },  {
            zoomLevel: 5,
            scale: 0.5,
            title: "Beijing",
            latitude: 39.9056,
            longitude: 116.3958
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Shanghai",
            latitude: 31.241963,
            longitude: 121.454780
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Tokyo",
            latitude: 35.6785,
            longitude: 139.6823,
            url:"http://www.google.co.jp"
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "New York",
            latitude: 40.707997, 
            longitude: -73.975561
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Las Vegas",
            latitude: 36.168526, 
            longitude: -115.128308
        }]
    }
});

// add events to recalculate map position when the map is moved or zoomed
map.addListener("positionChanged", updateCustomMarkers);

// this function will take current images on the map and create HTML elements for them
function updateCustomMarkers (event) {
    // get map object
    var map = event.chart;
    
    // go through all of the images
    for( var x in map.dataProvider.images) {
        // get MapImage object
        var image = map.dataProvider.images[x];
        
        // check if it has corresponding HTML element
        if ('undefined' == typeof image.externalElement)
            image.externalElement = createCustomMarker(image);

        // reposition the element accoridng to coordinates
        image.externalElement.style.top = map.latitudeToY(image.latitude) + 'px';
        image.externalElement.style.left = map.longitudeToX(image.longitude) + 'px';
    }
}

// this function creates and returns a new marker element
function createCustomMarker(image) {
    // create holder
    var holder = document.createElement('div');
    holder.className = 'map-marker';
    holder.title = image.title;
    holder.style.position = 'absolute';
    
    // maybe add a link to it?
    if (undefined != image.url) {
        holder.onclick = function() {
            window.location.href = image.url;
        };
        holder.className += ' map-clickable';
    }
    
    // create dot
    var dot = document.createElement('div');
    dot.className = 'dot';
    holder.appendChild(dot);
    
    // create pulse
    var pulse = document.createElement('div');
    pulse.className = 'pulse';
    holder.appendChild(pulse);
    
    // append the marker to the map container
    image.chart.chartDiv.appendChild(holder);
    
    return holder;
}
