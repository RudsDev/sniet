<!DOCTYPE html>
<%@page import="br.com.util.api.Maps"%>
<html>
<head>
<style>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
#map {
	height: 500px;
	width: 70%;
	position: absolute;
	left: 200px;
	top: 50px;
}
/* Optional: Makes the sample page fill the window. */
html, body {
	height: 100%;
	margin: 0;
	padding: 0;
}
</style>
</head>
<body>
	<%

Maps maps = new Maps();

maps.teste();

%>
	<div id="map"></div>
	<script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: new google.maps.LatLng(-22.820721,-43.360028),
          mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      }

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }
    </script>
	<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk&callback=initMap">
    </script>
</body>
</html>

<!--
<%@page import="br.com.util.api.Maps"%>
<html>
<body>
<h2>Hello World!</h2>
<h4>Est� me procurando</h4>
<%

//Maps maps = new Maps();

//maps.teste();

%>

</body>
</html>
  -->