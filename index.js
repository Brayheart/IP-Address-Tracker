let lat = ''
let lng = ''
let searchTerm = ''

function getInputValue() {
    console.log('here')
    searchTerm = document.querySelector('#input').value;
    IPsearch()
}

function IPsearch() {
    fetch('https://geo.ipify.org/api/v2/country,city?apiKey=&ipAddress=' + searchTerm)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            lat = data.location.lat
            lng = data.location.lng
            mapsearch()
    });
}

function mapsearch() {

    var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

    var map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);


    setTimeout(map.invalidateSize.bind(map),200)
}

IPsearch()