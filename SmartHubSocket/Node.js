// Importing the required modules
const WebSocketServer = require('ws');
let express=require('express');
let app=express();
const axios = require('axios');
app.use(express.static('/var/www/coding'));
var ip = require('ip');
const exec = require('child_process').exec;

 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 9001 })

var client
// Creating connection using websocket
wss.on("connection", (ws,req) => {
    console.log("new client connected");
    client=ws;
   
    let wait=0;
    let waiting=0;
    
    
	ws.on('message', data => {
	
	let command = data.toString('utf-8');
	console.log(command);
	let instructions = command.split(' ');
	console.log(instructions);
	console.log(instructions[0]);
	
	
	if(instructions[0]=="wait"){
		let commandtosend = new Array("0",command);
		client.send(JSON.stringify(commandtosend));	
	}
	if(instructions[0]=="from"){	
			
			var cmd=command.replace(/from cmd: /g,'');
			console.log(cmd);
			exec(cmd,(err,stdout,stderr) => {
				if(err){
					console.log('' +err);
					let errortosend = new Array("1",err.message);
					client.send(JSON.stringify(errortosend));
					return;
				}
			
			
			client.send(JSON.stringify(stdout));
			
			
			});
		}
	else{	
		var sendMessage=new Promise(function(resolve,reject){
		
			let solved=false;
		
			if (instructions[0]=="usb"){
				let num=instructions[1];
				
				if(instructions[2]=="on"){
					axios
					.put('http://'+ ip.address() +':80/v2/usb/'+num+'?value=high',{
					})
					.then(res =>{
						if(res.status=="200"){
							solved=true;
							resolve(solved);
										
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
						})					
					}
				else if(instructions[2]=="off"){
					axios
					.put('http://'+ ip.address() +':80/v2/usb/'+num+'?value=low',{
					})
					.then(res =>{	
						if(res.status=="200"){
							solved=true;
							resolve(solved);
							
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
					})
				}
					}
			else if (instructions[0]=="jtag"){
				if(instructions[1]=="on"){
					axios
					.put('http://'+ ip.address() +':80/v2/jtag?value=high',{
					})
					.then(res =>{
						if(res.status=="200"){
							solved=true;
							resolve(solved);			
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
						})					
					}
				else if(instructions[1]=="off"){
					axios
					.put('http://'+ ip.address() +':80/v2/jtag?value=low',{
					})
					.then(res =>{	
						if(res.status=="200"){
							solved=true;
							resolve(solved);
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
					})
				}
				
			}
			else if (instructions[0]=="power"){
				if(instructions[1]=="on"){
					axios
					.put('http://'+ ip.address() +':80/v2/power?value=high',{
					})
					.then(res =>{
						if(res.status=="200"){
							solved=true;
							resolve(solved);			
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
						})					
				}
				else if(instructions[1]=="off"){
					axios
					.put('http://'+ ip.address() +':80/v2/power?value=low',{
					})
					.then(res =>{	
						if(res.status=="200"){
							solved=true;
							resolve(solved);
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
					})
				}
			}
			else if (instructions[0]=="boot"){
				if(instructions[1]=="on"){
					axios
					.put('http://'+ ip.address() +':80/v2/boot?value=high',{
					})
					.then(res =>{
						if(res.status=="200"){
							solved=true;
							resolve(solved);
										
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
						})					
				}
				else if(instructions[1]=="off"){
					axios
					.put('http://'+ ip.address() +':80/v2/boot?value=low',{
					})
					.then(res =>{	
						if(res.status=="200"){
							solved=true;
							resolve(solved);
							
						}						
					})
					.catch(error =>{
						console.error(error);
						solved=false;
						resolve(solved);
					})
				}
			}
			
			
			
			
		});	
		sendMessage.then(function(status){
		console.log(status)
		let commandtosend = new Array("0",command);
		client.send(JSON.stringify(commandtosend));
		}).catch(function(status){
		console.log(status)
		let errortosend = new Array("1","ERROR ON COMMAND");
		client.send(JSON.stringify(errortosend));
		})
	
	}
	
	
			
	

	
	
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
console.log("The WebSocket server is running on port 9001");




