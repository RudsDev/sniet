<!DOCTYPE html>
<%@page import="br.com.util.api.Geografico"%>
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
	
	out.println("<br>"+maps.local());
	out.println("<br>"+maps.cidade());
	out.println("<br>"+maps.uf());
	out.println("<br>"+maps.pais());
	out.println("<br>"+maps.latitude());
	out.println("<br>"+maps.longitude());
	out.println("<br>"+maps.enderecoFormatado());
	
	//out.println(maps.localLatitude());
	//out.println(maps.localLongitude());
	//out.println(maps.location());
	//out.println(maps.teste());
	//out.println(maps.testeJson());
	//out.println(maps.testeLatitude());
	
		//Geografico geo = new Geografico();
		//out.println(geo.getPais());
		//out.println(maps.latitude());
		//out.println("<br>"+maps.longitude());
		//out.println("<br>" + maps.teste());
		
	%>
	<div id="map"></div>
<!-- 

	<script>
		function initMap() {
			var rj = {lat:-22.951695, lng:-43.2108};
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom : 10,
				center : rj,
			});
			
			var contentString = '<div id="content">'+
		      '<div id="siteNotice">'+
		      '</div>'+
		      '<h1 id="firstHeading" class="firstHeading">Rio de Janeiro</h1>'+
		      '<div id="bodyContent">'+
		      '<p>Silvio Santos Ipsum estamos em ritmo de festamm. O prêmio é em barras de ouro, que vale mais que dinheiroam. Você veio da caravana de ondeammm? O Raul Gil é gayam! ... Maa O Ah Ae! Ih Ih! O Raul Gil é gayamm! É bom ou não éam? Mah roda a roduamm. Você veio da caravana de ondeammm? Vem pra lá, mah você vai pra cá. Agora vai, agora vem pra láamm. Mah você mora com o papai ou com a mamãem? Ma quem quer dinheiroam? Um, dois três, quatro, PIM, entendeuam? Eu só acreditoammmm.... Vendoammmm. O Raul Gil é gayam! ... Maa O Ah Ae! Ih Ih! O Raul Gil é gayamm! Qual é a musicamm?</p>'+
		      '<p>Attribution: Silvio Santos Ipsum, <a href="http://silviosantosipsum.com/">'+
		      'http://silviosantosipsum.com/</a> '+
		      '(last visited June 22, 2009).</p>'+
		      '</div>'+
		      '</div>';

		  var infowindow = new google.maps.InfoWindow({
		    content: contentString
		  });

			var marker = new google.maps.Marker({
				  position: rj,
				  map: map,		
				  title: 'Rio de Janeiro'
				});
			
			marker.addListener('click', function() {
			    infowindow.open(map, marker);
			  });

				<% 
				
					/*for (Incidente incidente : maps.testeLatitude()){
						out.println("var marker = new google.maps.Marker({");
						out.println("position: {lat: "+incidente.getLocal().getLatitude()+
									","+"lng: "+incidente.getLocal().getLongitude()+"},");
						out.println("map: map");
						out.println("});");
					}*/
				
				%>
		}
	</script>
 -->
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