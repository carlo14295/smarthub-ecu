// Importing the required modules
const WebSocketServer = require('ws');
let express=require('express');
let app=express();
	
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
var program = require ('commander');

app.use(express.static('/var/www/coding'));
var ip = require('ip');
const exec = require('child_process').exec;
var ports=new Map();
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 9002 })

var client
// Creating connection using websocket
wss.on("connection", (ws,req) => {
    console.log("new client connected");
    client=ws;
   
	ws.on('message', data => {
	
	let commandfromclient= data.toString('utf-8');
	let command = commandfromclient.split(',');
	console.log(command);
	console.log(command[0]);

	var PORT = command[0];
	var BAUDRATE = Number(command[1]);
	var port = new SerialPort({
		path:"/dev/"+PORT,
		baudRate: BAUDRATE,
	});
	ports[PORT] = port;
	console.log(PORT+" port is open with baudrate: "+ BAUDRATE);
	
	const parser = port.pipe(new ReadlineParser({delimiter: ' '}))
	port.on('data',function(data){
		
		console.log([data.toString(),command[2]]);
		client.send(JSON.stringify([data.toString(),PORT]));	
	
	});
	

	});


	
   	 // handling what to do when clients disconnects from server
    	ws.on("close", () => {
        console.log("the client has connected");
   	 });
    	// handling client connection error
   	 ws.onerror = function () {
        console.log("Some Error occurred")
    	}
    




});
console.log("The Serial Terminal server is running on port 9002");