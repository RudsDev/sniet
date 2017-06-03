<!DOCTYPE html>
<%@page import="br.com.model.api.Incidente"%>
<%@page import="br.com.dao.api.IncidenteDao"%>
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
		MapsTest maps = new MapsTest();
	%>
	<div id="map"></div>


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
		      '<p>Silvio Santos Ipsum estamos em ritmo de festamm. O pr�mio � em barras de ouro, que vale mais que dinheiroam. Voc� veio da caravana de ondeammm? O Raul Gil � gayam! ... Maa O Ah Ae! Ih Ih! O Raul Gil � gayamm! � bom ou n�o �am? Mah roda a roduamm. Voc� veio da caravana de ondeammm? Vem pra l�, mah voc� vai pra c�. Agora vai, agora vem pra l�amm. Mah voc� mora com o papai ou com a mam�em? Ma quem quer dinheiroam? Um, dois tr�s, quatro, PIM, entendeuam? Eu s� acreditoammmm.... Vendoammmm. O Raul Gil � gayam! ... Maa O Ah Ae! Ih Ih! O Raul Gil � gayamm! Qual � a musicamm?</p>'+
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
		}
	</script>
	
	<!-- Renderiza��o ass�ncrona do mapa Google carregando todos os dados que foram tratados acima -->
	<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk&callback=initMap">
		
	</script>
</body>
</html>