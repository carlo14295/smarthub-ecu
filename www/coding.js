function SMART_WS(){
	var smartsocket = new WebSocket("ws://"+ location.host +":9001");

setTimeout(function(){
		
	var script = document.getElementById("code").value;
	var rows=script.split("\n")
	var numrows=rows.length;
	console.log(numrows)
	while(rows[numrows-1]==[]){
		if(rows[numrows-1]==[]){
		numrows--;
		rows.pop();	
		}	
	}
	rows=rows.slice(0,numrows);
	let i=0;
	let wait=0;
	let wrong=0;
	let numcorrect=0;
	var seconds=2000;
	
	let words=new Array("usb","jtag","boot","power","from","cmd:","off","on","wait");
	

	document.getElementById("compiling").value="CHECKING CORRECTNESS...\n";

	setTimeout(function(){

	for (var k=0;k<numrows;k++){ /* CHECKING CORRECTNESS*/	
		
			var scriptsplit=rows[k].split(' ');
				
				for (var z=0;z<9;z++){
					if(scriptsplit[0]==words[z]){
					numcorrect++;
					}
				}
				if(numcorrect<1){
					wrong=1;
					document.getElementById("compiling").value+="ERROR in row "+[k+1]+": uncorrect word: "+scriptsplit[0]+"\n";
					k=numrows;		
				}
				else{
					wrong=0;
					numcorrect=0;	
				}
					
				if(scriptsplit[0]=="from"&&wrong==0){
					for (var z=0;z<9;z++){
						if(scriptsplit[1]==words[z]){
						numcorrect++;
						}
					}
					if(numcorrect<1){
						wrong=1;
						document.getElementById("compiling").value+="ERROR in row "+[k+1]+": uncorrect word: "+scriptsplit[1]+"\n";
						k=numrows;		
					}
					else{
						wrong=0;
						numcorrect=0;
					}		
				}
				else if(scriptsplit[0]=="usb"&&wrong==0){
					if (scriptsplit[1]<9){
						for (var z=0;z<9;z++){
							if(scriptsplit[2]==words[z]){
							numcorrect++;
							}
						}
						if(numcorrect<1){
						wrong=1;
						document.getElementById("compiling").value+="ERROR in row "+[k+1]+": uncorrect word: "+scriptsplit[2]+"\n";	
						k=numrows;	
						}
						else{
						wrong=0;
						numcorrect=0;
						}
					}
					else{
					wrong=1;
					document.getElementById("compiling").value+="ERROR in row "+[k+1]+": uncorrect number: "+scriptsplit[1]+"\n";
					k=numrows;
					}
						
				}
				else if((scriptsplit[0]=="power"||scriptsplit[0]=="boot"||scriptsplit[0]=="jtag")&&wrong==0){
					for (var z=0;z<8;z++){
						if(scriptsplit[1]==words[z]){
						numcorrect++;
						}
					}
					if(numcorrect<1){
						wrong=1;
						document.getElementById("compiling").value+="ERROR in row "+[k+1]+": uncorrect word: "+scriptsplit[1]+"\n";
						k=numrows;		
					}
					else{
						wrong=0;
						numcorrect=0;
					}		
				}
		if(wrong!=0){
		
		i=numrows;
			
		}		
	}
		if(wrong==0&&k==numrows){
			document.getElementById("compiling").value+="COMMANDS OK..\n";
			smartsocket.send(rows[0]);
		}
	},1000);






	smartsocket.onmessage= function(message){
	i++;
	let commandfromserver=JSON.parse(message.data);
	console.log(commandfromserver);
	console.log(commandfromserver[1]);
	
	
	if(commandfromserver[0]=="0"){
		console.log(commandfromserver[1]);
		let instructions=commandfromserver[1].split(' ');
		if (instructions[0]=="wait"){
			document.getElementById("compiling").value+="WAITING "+instructions[1]+" seconds...\n";	
			scrollLogToBottom();
			seconds=instructions[1]*1000;
		}
		else{	
			wait=0;
			seconds=2000;
			if (instructions[0]=="usb"){
				let num=instructions[1];
				if(instructions[2]=="on"){
					document.getElementById("USB"+num).checked=true;
				}
				else if(instructions[2]=="off"){
					document.getElementById("USB"+num).checked=false;
					}
				document.getElementById("compiling").value+="The USB "+num+" is switched "+instructions[2]+"\n";
				scrollLogToBottom();
			}
			
			else if (instructions[0]=="jtag"){
				if(instructions[1]=="on"){
					document.getElementById("JTAG").checked=true;
				}
				else if(instructions[1]=="off"){
					document.getElementById("JTAG").checked=false;
					}
				document.getElementById("compiling").value+="The JTAG is switched "+instructions[1]+"\n";
				scrollLogToBottom();
			}
			else if (instructions[0]=="power"){
				if(instructions[1]=="on"){
					document.getElementById("SUPPLY").checked=true;
				}
				else if(instructions[1]=="off"){
					document.getElementById("SUPPLY").checked=false;
					}
				document.getElementById("compiling").value+="The POWER SUPPLY is switched "+instructions[1]+"\n";
				scrollLogToBottom();
			}
			else if (instructions[0]=="boot"){
				if(instructions[1]=="on"){
					document.getElementById("BOOT").checked=true;
				}
				else if(instructions[1]=="off"){
					document.getElementById("BOOT").checked=false;
					}
				document.getElementById("compiling").value+="The BOOT is switched "+instructions[1]+"\n";
				scrollLogToBottom();
			}

		}
	}
	else if(commandfromserver[0]=="1"){
		document.getElementById("compiling").value+="ERROR: "+commandfromserver[1];
		scrollLogToBottom();
		i=numrows;	
	}
	else if((commandfromserver[0]!="1")&&(commandfromserver[0]!="1")){
		document.getElementById("compiling").value+="OUTPUT OF COMMAND: \n"+ commandfromserver+"     END OUTPUT\n\n";
		scrollLogToBottom();
		}
		setTimeout(function(){
			if(i<numrows){
				rows.shift();
				smartsocket.send(rows[0]);
			}
		},seconds);
	}

	
	
	
},1000);
};