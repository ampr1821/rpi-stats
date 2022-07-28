var socket = io();

socket.on('msg', (msg)=>{
  document.getElementById('temp').textContent = msg.temp + '°C';
  document.getElementById('cpu').textContent = msg.cpu + '%';
  document.getElementById('ram').textContent = msg.ram + '%';
});