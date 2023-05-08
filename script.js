


function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}


function success(position){
    const { latitude, longitude } = position.coords

    let map = L.map('map').setView([latitude, longitude], 14);

    let titleLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // let marker = L.marker([latitude, longitude]).addTo(map)

    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(null, null)
        ],
        show: false,
    // }).on('routesfound',function(e){
    //     e.routes[0].coordinates.forEach((coordinat, index)=> {
    //         const markerTimeout = setTimeout(()=>{
    //             marker.setLatLng([coordinat.lat, coordinat.lng])
    //         },200*index)
    //     });
    }).addTo(map)
    

    map.on('click', function(e) {
        var container = L.DomUtil.create('div'),
            startBtn = createButton('Начать с этой точки', container),
            destBtn = createButton('Идти к этой точке', container),
            myLocationBtn = createButton('Мое местоположение', container);
    
        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);

        L.DomEvent.on(startBtn, 'click', function() {
            control.spliceWaypoints(0, 1, e.latlng);
            map.closePopup();
        });
        L.DomEvent.on(destBtn, 'click', function() {
            control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
            map.closePopup();
        });
        L.DomEvent.on(myLocationBtn, 'click', function() {
            control.spliceWaypoints(0, 1, [latitude, longitude]);
            map.closePopup().setView([latitude, longitude], 13);
        });
    });
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 3000
}

function error() {
    alert('Где ты вообще...'); // на случай ошибки
}


navigator.geolocation.getCurrentPosition(success, error, options)








  