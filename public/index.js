var socket = io();
var temp = document.getElementById('temp');
var cpu = document.getElementById('cpu');
var ram = document.getElementById('ram');

socket.on('msg', (msg)=>{
  temp.textContent = msg.temp;
  cpu.textContent = msg.cpu;
  ram.textContent = msg.ram;
});