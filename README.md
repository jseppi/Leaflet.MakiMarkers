# Leaflet.MakiMarkers

[Leaflet](http://www.leafletjs.com) plugin to create map icons using [Maki Icons](https://www.mapbox.com/maki/) from MapBox. Markers are retrieved from MapBox's [Static Marker API](https://www.mapbox.com/developers/api/#Stand-alone.markers).

![Screenshot](https://raw.github.com/jseppi/Leaflet.MakiMarkers/master/images/screenshot.png "Screenshot of MakiMarkers")

## Usage

Simply include `Leaflet.MakiMarkers.js` in your page after your `Leaflet.js` include: `<script src="Leaflet.MakiMarkers.js"></script>`
  
    //Specify a Maki icon name, hex color, and size (s, m, or l)
    //An array of icon names can be found in L.MakiMarkers.icons or at https://www.mapbox.com/maki/
    var icon = L.MakiMarkers.icon({icon: "rocket", color: "#b0b", size: "m"});
    L.marker([30.287, -97.72], {icon: icon}).addTo(map);
  
[JSFiddle Demo](http://jsfiddle.net/Zhzvp/)

## Requirements

- [Leaflet]((http://www.leafletjs.com) 1.5+

## Thanks

Thanks to [MapBox](http://www.mapbox.com) for making their Marker API available and for the Maki icon set.
