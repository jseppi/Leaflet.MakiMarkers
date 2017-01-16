/*
 * Leaflet plugin to create map icons using Maki Icons from MapBox.
 *
 * References:
 *   Maki Icons: https://www.mapbox.com/maki/
 *   Mapbox Marker API: https://www.mapbox.com/api-documentation/#retrieve-a-standalone-marker
 *   Possible icon names: https://raw.githubusercontent.com/mapbox/maki/master/layouts/all.json
 *
 * Usage:
 *   L.MakiMarkers.accessToken = "<YOUR_ACCESS_TOKEN>";
 *   var icon = L.MakiMarkers.icon({icon: "rocket", color: "#b0b", size: "m"});
 *
 * License:
 *   MIT: http://jseppi.mit-license.org/
 */
 /*global L:false */
(function () {
  "use strict";
  L.MakiMarkers = {
    accessToken: null,
    defaultColor: "#0a0",
    defaultIcon: "circle-stroked",
    defaultSize: "m",
    apiUrl: "https://api.mapbox.com/v4/marker/",
    smallOptions: {
      iconSize: [20, 50],
      popupAnchor: [0,-20]
    },
    mediumOptions: {
      iconSize: [30,70],
      popupAnchor: [0,-30]
    },
    largeOptions: {
      iconSize: [36,90],
      popupAnchor: [0,-40]
    }
  };

  L.MakiMarkers.Icon = L.Icon.extend({
    options: {
      //Mapbox API access token, see https://www.mapbox.com/api-documentation/?language=CLI#access-tokens
      //Instead of setting with each icon, you can set globally as L.MakiMarkers.accessToken
      accessToken: null,
      //Maki icon: any valid name, see https://raw.githubusercontent.com/mapbox/maki/master/layouts/all.json
      icon: L.MakiMarkers.defaultIcon,
      //Marker color: short or long form hex color code
      color: L.MakiMarkers.defaultColor,
      //Marker size: "s" (small), "m" (medium), or "l" (large)
      size: L.MakiMarkers.defaultSize,
      shadowAnchor: null,
      shadowSize: null,
      shadowUrl: null,
      className: "maki-marker"
    },

    initialize: function(options) {
      var pin;
      var tokenQuery;

      var accessToken = options.accessToken || L.MakiMarkers.accessToken;
      if (!accessToken) {
        throw new Error("Access to the Mapbox API requires a valid access token.");
      }

      tokenQuery = "?access_token=" + accessToken;
      options = L.setOptions(this, options);

      switch (options.size) {
        case "s":
          L.extend(options, L.MakiMarkers.smallOptions);
          break;
        case "l":
          L.extend(options, L.MakiMarkers.largeOptions);
          break;
        default:
          options.size = "m";
          L.extend(options, L.MakiMarkers.mediumOptions);
          break;
      }

      pin = "pin-" + options.size;

      if (options.icon !== null) {
        pin += "-" + options.icon;
      }

      if (options.color !== null) {
        if (options.color.charAt(0) === "#") {
          options.color = options.color.substr(1);
        }

        pin += "+" + options.color;
      }

      options.iconUrl = "" + L.MakiMarkers.apiUrl + pin +  ".png" + tokenQuery;
      options.iconRetinaUrl = L.MakiMarkers.apiUrl + pin + "@2x.png" + tokenQuery;
    }
  });

  L.MakiMarkers.icon = function(options) {
    return new L.MakiMarkers.Icon(options);
  };
})();
