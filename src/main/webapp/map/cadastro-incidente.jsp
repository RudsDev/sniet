<!DOCTYPE html>
<html>
<head>
<title>Place Autocomplete Address Form</title>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">

<link type="text/css" rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
<style>
#locationField, #controls {
	position: relative;
	width: 480px;
}

#autocomplete {
	position: absolute;
	top: 0px;
	width: 99%;
}
</style>
</head>

<body>
	<div id="locationField">
		Nome do Local: <input id="autocomplete" placeholder="Digite o local"
			onFocus="geolocate()" type="text" />
	</div>

	<div>
		Local<input id="route" disabled="true" />
	</div>

	<div>
		Cidade<input id="locality" disabled="true" />
	</div>
	<!-- Note: Selection of address components in this example is typical.
             You may need to adjust it for the locations relevant to your app. See
             https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
        -->

	<div>
		UF<input id="administrative_area_level_1" disabled="true" />
	</div>

	<div>
		Pais<input id="country" disabled="true" />
	</div>

	<div>
		Latitude<input id="administrative_area_level_2" disabled="true" />
	</div>

	<div>
		Longitude<input id="administrative_area_level_3" disabled="true" />
	</div>


	<script>
		// This example displays an address form, using the autocomplete feature
		// of the Google Places API to help users fill in the information.

		// This example requires the Places library. Include the libraries=places
		// parameter when you first load the API. For example:
		// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

		var placeSearch, autocomplete;
		var componentForm = {
			route : 'long_name',
			locality : 'long_name',
			administrative_area_level_1 : 'short_name',
			country : 'long_name',
			administrative_area_level_2: 'long_name',
			administrative_area_level_3: 'long_name'
		};

		function initAutocomplete() {
			// Create the autocomplete object, restricting the search to geographical
			// location types.
			autocomplete = new google.maps.places.Autocomplete(
			/** @type {!HTMLInputElement} */
			(document.getElementById('autocomplete')), {
				types : [ 'geocode' ]
			});

			// When the user selects an address from the dropdown, populate the address
			// fields in the form.
			autocomplete.addListener('place_changed', fillInAddress);
		}

		function fillInAddress() {
			// Get the place details from the autocomplete object.
			var place = autocomplete.getPlace();

			for ( var component in componentForm) {
				document.getElementById(component).value = '';
				document.getElementById(component).disabled = false;
			}

			// Get each component of the address from the place details
			// and fill the corresponding field on the form.
			for (var i = 0; i < place.address_components.length; i++) {
				var addressType = place.address_components[i].types[0];
				if (componentForm[addressType]) {
					var val = place.address_components[i][componentForm[addressType]];
					document.getElementById(addressType).value = val;
				}
			}
		}

		// Bias the autocomplete object to the user's geographical location,
		// as supplied by the browser's 'navigator.geolocation' object.
		function geolocate() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var geolocation = {
						lat : position.coords.latitude,
						lng : position.coords.longitude
					};
					var circle = new google.maps.Circle({
						center : geolocation,
						radius : position.coords.accuracy
					});
					autocomplete.setBounds(circle.getBounds());
				});
			}
		}
	</script>
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk&libraries=places&callback=initAutocomplete"
		async defer></script>
</body>
</html>