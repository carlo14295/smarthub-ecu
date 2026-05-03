function SMART_SERIAL(event){
	var smartserial = new WebSocket("ws://"+ location.host +":9002");

setTimeout(function(){
	
	var id = event.target.getAttribute("view_num")
	
	var tty = $('#seltty'+id).val();
	var serialid=document.getElementById("serial"+id);
	serialid.setAttribute("serial_num",tty);
	serialid.id=$('#seltty'+id).val();
	var speed = $('#selspeed'+id).val();
	var id = event.target.getAttribute("view_num")
	var ttyspeed=new Array(tty,speed);
	console.log(id)
	console.log(ttyspeed)	
	smartserial.send(ttyspeed);
	document.getElementById(tty).value+=tty+" port is open with baudrate: "+ speed+"\n\n";
	
	smartserial.onmessage= function(message){
	
	let serialcmd = JSON.parse(message.data);
	console.log(serialcmd)
	console.log(serialcmd[0])
	document.getElementById(serialcmd[1]).value+=serialcmd[0];
	scrollLogToBottom();	
	}
	
	
},2000);
};

	