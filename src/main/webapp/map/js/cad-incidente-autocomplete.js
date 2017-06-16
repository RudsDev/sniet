$(document).ready(function () {


    var placeSearch, autocomplete;
    var componentForm = {
        formatado,
        sublocality_level_1: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        lat,
        lng
    };

    function initAutocomplete() {

        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('autocomplete')), {
                types: ['geocode']
            }
        );

        autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {

        var place = autocomplete.getPlace();

        for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
            console.log(component);
        }



        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
            else {
                console.log("Entrei no else!");
                console.log(addressType);
            }
        }

        console.log(place.formatted_address);
        if (place.formatted_address) {
            console.log("Entrei no if!");
            document.getElementById("formatado").value = place.formatted_address;
        }

        console.log(place.geometry.location.lat());
        if (place.formatted_address) {
            console.log("Entrei no if!");
            document.getElementById("lat").value = place.geometry.location.lat();
        }

        console.log(place.geometry.location.lng());
        if (place.formatted_address) {
            console.log("Entrei no if!");
            document.getElementById("lng").value = place.geometry.location.lng();
        }

    }

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    }
});