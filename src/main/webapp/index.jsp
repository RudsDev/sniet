<!DOCTYPE html>
<%@page import="br.com.model.api.Incidente"%>
<%@page import="br.com.dao.api.IncidenteDao"%>
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
		//out.println(maps.testeJson());
		//out.println(maps.latitude());
		//out.println("<br>"+maps.longitude());
		//out.println("<br>" + maps.teste());
		
	%>
	<div id="map"></div>
	

	<script>
		function initMap() {
			var uluru = {lat:-25.363, lng:131.044};
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom : 4,
				center : uluru,
			});
			
			var contentString = '<div id="content">'+
		      '<div id="siteNotice">'+
		      '</div>'+
		      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
		      '<div id="bodyContent">'+
		      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
		      'sandstone rock formation in the southern part of the '+
		      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
		      'south west of the nearest large town, Alice Springs; 450&#160;km '+
		      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
		      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
		      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
		      'Aboriginal people of the area. It has many springs, waterholes, '+
		      'rock caves and ancient paintings. Uluru is listed as a World '+
		      'Heritage Site.</p>'+
		      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
		      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
		      '(last visited June 22, 2009).</p>'+
		      '</div>'+
		      '</div>';

		  var infowindow = new google.maps.InfoWindow({
		    content: contentString
		  });

			var marker = new google.maps.Marker({
				  position: {lat:-25.363, lng:131.044},
				  map: map,		
				  title: 'Uluru (Ayers Rock)'
				});
			
			marker.addListener('click', function() {
			    infowindow.open(map, marker);
			  });

				<% 
				/*
					for (Incidente incidente : maps.testeLatitude()){
						out.println("var marker = new google.maps.Marker({");
						out.println("position: {lat: "+incidente.getLatitude()+","+"lng: "+incidente.getLongitude()+"},");
						out.println("map: map");
						out.println("});");
					}
				*/
				%>
		}
	</script>

	<!-- 
	<script>
		var map;
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				zoom : 5,
				center : new google.maps.LatLng(<%//out.print(maps.latitude());%>, <%//out.print(maps.longitude());%>),
				mapTypeId : 'terrain'
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
				var latLng = new google.maps.LatLng(coords[1], coords[0]);
				var marker = new google.maps.Marker({
					position : latLng,
					map : map
				});
			}
		}
	</script>
 -->
	<!-- Renderização assíncrona do mapa Google carregando todos os dados que foram tratados acima -->
	<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk&callback=initMap">
		
	</script>
</body>
</html>