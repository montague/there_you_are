// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import {Socket} from "deps/phoenix/web/static/js/phoenix"

let socket = new Socket("/socket")
socket.connect()
let chan = socket.channel("rooms:lobby", {})
chan.join().receive("ok", chan => {
  console.log("Welcome to Phoenix Chat!")
})

let markers = [];
window.markers = markers;
navigator.geolocation.getCurrentPosition(function(p){
  console.log("sending lat: " + p.coords.latitude);
  console.log("sending lat: " + p.coords.longitude);
  let position = {lat: p.coords.latitude, lng: p.coords.longitude};

  if(window.map){
    window.map.setCenter(position);
  }

  chan.push("new_location", {
    body: {
      lat: position.lat,
      lng: position.lng
    }
  });
});

chan.on("new_location", payload => {
  payload = payload.body;
  console.log("new location received!");
  if(window.map){
    markers.push(
      new google.maps.Marker({
        position: payload,
        map: window.map
      })
    );
  }
})

let initMap = () => {
  console.log("init map being called");
  var element = document.getElementById('map');
  var map = new google.maps.Map(element, {
    zoom: 1
  });

  window.map = map;
}
window.initMap = initMap;
