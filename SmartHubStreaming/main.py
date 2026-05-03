import picamera
import pyshine as ps
import netifaces as ni


HTML="""
<html>
<head>
<title> PyShine Live Streming</title>
</head>

<body>
<center><h1> PyShine Live Streming using Pi Camera </h1></center>
<center><img src="stream.mjpg" width='640' height='480' autoplay playsinline></center>
</body>
</html>
"""

ip_address = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']

def main():
	StreamProps = ps.StreamProps
	StreamProps.set_Page(StreamProps,HTML)
	address = (ip_address,9003)
	StreamProps.set_Mode(StreamProps,'picamera')
	with picamera.PiCamera(resolution='640x480',framerate=30) as camera:
		output = ps.StreamOut()
		StreamProps.set_Output(StreamProps,output)
		camera.rotation = 90
		camera.start_recording(output, format='mjpeg')
		try:
			server = ps.Streamer(address,StreamProps)
			print('Server Started at','http://'+address[0]+':'+str(address[1]))
			server.serve_forever()
		finally:
			camera.stop_recording()

if __name__=='__main__': 
	main()