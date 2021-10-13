     import request from "./request.js";
     export default function map() {
         let mymap = L.map('mapid').setView([59.6, 30.7], 10);
         L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             maxZoom: 18,
             id: 'mapbox/streets-v11',
             tileSize: 512,
             zoomOffset: -1,
             accessToken: 'pk.eyJ1IjoiYXZnYW5rYSIsImEiOiJja3VwZzVyZmIwNG1sMnFvenJtOTZzcWFwIn0.VAJzRjj5g4Pw39BPjKVKIg'
         }).addTo(mymap);

         //init cities
         request("https://api.openweathermap.org/data/2.5/box/city?bbox=31.51290893554688,58.981868088274744,29.877319335937504,60.20502797433089,10&appid=ec78d7f83e3600f0432b9078efb77a56")
             .then(json => {
                 json.list.sort(byField('name')).forEach(city => {
                     createSmallCards(city);
                 });
             })
             .catch(err => {});

         //  Get coordinates
         let boundingBox = [];
         mymap.addEventListener("moveend", () => {
             document.querySelector('.weather-content__small-cards').innerHTML = "";
             //  console.log(mymap.getCenter());
             //  console.log(mymap.getZoom());
             //  console.log(mymap.getBounds());
             let bbox = [mymap.getBounds()._northEast.lng, mymap.getBounds()._southWest.lat, mymap.getBounds()._southWest.lng, mymap.getBounds()._northEast.lat, 10].join(",");
             const token = 'ec78d7f83e3600f0432b9078efb77a56';
             const url = `https://api.openweathermap.org/data/2.5/box/city?bbox=${bbox}&appid=${token}`;
             request(url)
                 .then(json => {
                     json.list.forEach(city => {
                         createSmallCards(city);
                     });
                 })
                 .catch(err => {});
         });

         function byField(field) {
             return (a, b) => a[field] > b[field] ? 1 : -1;
         }

         function createSmallCards(city) {
             const smallCard = document.createElement('div');
             smallCard.classList.add('small-card');
             smallCard.innerHTML = `
             <span class="small-card__city">
                ${city.name}
              </span>
              <span class="small-card__temperature">+${Math.round(city.main.temp)}°</span>
              <span class="icon icon--strips-small"></span>
             `;
             document.querySelector('.weather-content__small-cards').appendChild(smallCard);
         }








     }