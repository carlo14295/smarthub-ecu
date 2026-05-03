function USBStatus(){ 
		   $.ajax({
		   		method: "GET",
		   		url: 'http://'+ location.host +':80/v2/usb',
		   		success: function(data, code, status) {
                                for(i=0;i<8;i++){
				let USB_id="USB"+(i+1)
			        document.getElementById(USB_id).checked=data[i][1];
			    		}
				},
		   	error: function() {console.log(arguments)},
		    	})
};


function SwitchUSB(event) {
        var num = event.target.getAttribute('usb_num')
	console.log(num)
        
	if (document.getElementById("USB"+num).checked==false){
		url = 'http://'+location.host+':80/v2/usb/'+num+'?value=high'
 		document.getElementById("USB"+num).checked=true;
	}
	else {
		url =  'http://'+location.host+':80/v2/usb/'+num+'?value=low'
 		document.getElementById("USB"+num).checked=false
	}
	$.ajax({
		method: "PUT",
		url: url,
		error: function(event) {console.log(arguments)},
		})
};







function JTAGStatus(){ 
		   $.ajax({
		   		method: "GET",
		   		url: 'http://'+ location.host +':80/v2/jtag',
		   		success: function(data, code, status) {
					if (data == 1){
			      			document.getElementById("JTAG").checked=true;
						}
					else if (data == 0){
			      			document.getElementById("JTAG").checked=false;	
				        	}
			    		},

		   	error: function() {console.log(arguments)},
		    	})
};

function SwitchJTAG() {
	if (document.getElementById("JTAG").checked==false){
		$.ajax({
			method: "PUT",
			url: 'http://'+ location.host +':80/v2/jtag?value=high',
			success: function(data, code, status) {
				document.getElementById("JTAG").checked=true;
				data=1;
				},
			error: function() {console.log(arguments)},
			})
	}
	else {
		$.ajax({
			method: "PUT",
			url: 'http://'+ location.host +':80/v2/jtag?value=low',
			success: function(data, code, status) {
				document.getElementById("JTAG").checked=false;
				data=0;
				},
			error: function() {console.log(arguments)},
			})
	}
};

function BOOTStatus(){ 
		   $.ajax({
		   		method: "GET",
		   		url: 'http://'+ location.host +':80/v2/boot',
		   		success: function(data, code, status) {
					if (data == 1){
			      			document.getElementById("BOOT").checked=true;
						}
					else if (data == 0){
			      			document.getElementById("BOOT").checked=false;	
				        	}
			    		},

		   	error: function() {console.log(arguments)},
		    	})
};

function SwitchBOOT() {
	if (document.getElementById("BOOT").checked==false){
		$.ajax({
			method: "PUT",
			url: 'http://'+ location.host +':80/v2/boot?value=high',
			success: function(data, code, status) {
				document.getElementById("BOOT").checked=true;
				data=1;
				},
			error: function() {console.log(arguments)},
			})
	}
	else {
		$.ajax({
			method: "PUT",
			url: 'http://'+ location.host +':80/v2/boot?value=low',
			success: function(data, code, status) {
				document.getElementById("BOOT").checked=false;
				data=0;
				},
			error: function() {console.log(arguments)},
			})
	}
};

function SUPPLYStatus(){ 
		   $.ajax({
		   		method: "GET",
		   		url: 'http://'+ location.host +':80/v2/power',
		   		success: function(data, code, status) {
					if (data == 1){
			      			document.getElementById("SUPPLY").checked=true;
						}
					else if (data == 0){
			      			document.getElementById("SUPPLY").checked=false;	
				        	}
			    		},

		   	error: function() {console.log(arguments)},
		    	})
};

function SwitchSUPPLY() {
	if (document.getElementById("SUPPLY").checked==false){
		$.ajax({
			method: "PUT",
			url: 'http://'+ location.host +':80/v2/power?value=high',
			success: function(data, code, status) {
				document.getElementById("SUPPLY").checked=true;
				data=1;
				},
			error: function() {console.log(arguments)},
			})
	}
	else {
		$.ajax({
			method: "PUT",
			url: 'http://'+ location.host +':80/v2/power?value=low',
			success: function(data, code, status) {
				document.getElementById("SUPPLY").checked=false;
				data=0;
				},
			error: function() {console.log(arguments)},
			})
	}
};



function PORTS_ACTIVE(){ 
	setTimeout(function(){
		   $.ajax({
		   		method: "GET",
		   		url: 'http://'+ location.host +':80/v2/port',
		   		success: function(data, code, status) {
					var datavector = data.split("\n");
					let ports=new Array(datavector.length-1);
					for(var i=0;i<datavector.length-1;i++){
					ports[i]=datavector[i].replace('/dev/','');
					}
					console.log(ports[2])
					for(i=0;i<ports.length;i++){
						console.log(ports[i]);
						var options = "<option value='"+ports[i]+"'>"+ports[i]+" </option>";
						document.getElementById('seltty0').innerHTML+=options;
						}
					
					
				
				},
				
		   		error: function() {console.log(arguments)},
			});
			    	

 		},1000);	
};




























