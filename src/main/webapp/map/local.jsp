<!DOCTYPE html>
<%@page import="br.com.model.api.Incidente"%>
<%@page import="br.com.util.api.MapsTest"%>
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
		response.addHeader("Access-Control-Allow-Origin", "*");
		//String nomeLocal = request.getAttribute("teste").toString();
		MapsTest maps = new MapsTest();
		//out.println("<br>" + "<br>" + request.getAttribute("teste"));
		//out.println("<br>" + "<br>" + maps.listaIncidentesJson());
		//out.println("<br>" + "<br>" + maps.latitudeLocal(nomeLocal));
		//out.println("<br>" + "<br>"+maps.longitude());
		//out.println("<br>" + "<br>" + maps.teste());
	%>
	<div id="map"></div>


	<script>
		function initMap() {
			var local = {lat:-22.951695, lng:-43.2108};
			
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom : 10,
				center : local,
			});
			
			var contentString = 'teste';

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
		}
	</script>
	
	<!-- Renderização assíncrona do mapa Google carregando todos os dados que foram tratados acima -->
	<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk&callback=initMap">	
	</script>
</body>
</html>