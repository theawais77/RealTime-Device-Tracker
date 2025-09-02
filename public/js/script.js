const socket=io();


if(navigator.geolocation){
  navigator.geolocation.watchPosition((position)=>{
    const {latitude,longitude}=position.coords;
    socket.emit("send-location",{latitude,longitude});
  },(error)=>{
    console.error("Error watching position:", error);
  },
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  }
);
}
const map = L.map("map").setView([0, 0], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© OpenStreetMap'
}).addTo(map);

socket.on("location-updated", (data) => {
  const { latitude, longitude } = data;
  L.marker([latitude, longitude]).addTo(map);
});