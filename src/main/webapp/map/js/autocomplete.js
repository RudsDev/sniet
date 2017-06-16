
var placeSearch, autocomplete;
var componentForm = {
    local,
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
    }

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            document.getElementById(addressType).value =
                place.address_components[i][componentForm[addressType]];
        }
    }

    if (place.formatted_address) {
        var str = place.formatted_address;
        var n = str.indexOf(",");
        var res = str.substring(0, n);
        document.getElementById("local").value =
            res;
    }

    if (place.geometry.location.lat()) {
        var str = place.geometry.location.lat().toString();
        var n = str.indexOf(".");
        var res = str.substring(0, (n + 7));
        document.getElementById("lat").value =
            res;
    }


    if (place.geometry.location.lng()) {
        var str = place.geometry.location.lng().toString();
        var n = str.indexOf(".");
        var res = str.substring(0, (n + 7));
        document.getElementById("lng").value =
            res;
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
        });
    }
}