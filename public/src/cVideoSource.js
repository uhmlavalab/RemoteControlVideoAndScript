//--------------------------------------------------------------------------------------------------------------------------Global vars
var debug = true;
var wsio;
var localMediaStream = null;

window.onload = initializeWS;

//--------------------------------------------------------------------------------------------------------------------------Start wsio communcation

function initializeWS() {
	console.log("Initializing videoSource client");

	// Create a connection to server
	wsio = new WebsocketIO();
	console.log("Websocket status:" + wsio);
	wsio.open(function() {
		console.log("Websocket opened, ending addClient");
		
		wsio.emit('addClient', { "type":"videoSource"});

		setupListeners(); 
	});

	wsio.on('close', function (evt) {
		alert('Lost connection');
	});


} //end initialize


//--------------------------------------------------------------------------------------------------------------------------
function setupListeners() {
	wsio.on('serverAccepted', function(data) {
		console.log("Accepted by server, starting up video stream.");

		beginVideoCapture();

		console.log("Camera set to stream beginning send to server loop.");

		setInterval(sendPicture, 50); //send a picture with ms delay between sends.
	});
}



//--------------------------------------------------------------------------------------------------------------------------
function sendPicture() {
	var video = document.querySelector('video');
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');

	if (localMediaStream) {
		//draw image to recollect it as a text
		ctx.drawImage(video, 0, 0);
		// "image/webp" works in Chrome.
		// Other browsers will fall back to image/png.
		var imageStringFormat = canvas.toDataURL('image/webp');

		wsio.emit('videoSourceImageToServer', { "image": imageStringFormat } );

	}

}

function beginVideoCapture() {

	//grab references to the elements.
	var video = document.querySelector('video');
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	localMediaStream = null;

	//Check the user media style. Different depending on browser.
	navigator.getUserMedia  = navigator.getUserMedia ||
	                      navigator.webkitGetUserMedia ||
	                      navigator.mozGetUserMedia ||
	                      navigator.msGetUserMedia;
	//After determining browser interface, enable stream functionality.
	navigator.getUserMedia(
		{video: true},
		function(stream) {
			video.src = window.URL.createObjectURL(stream);
			localMediaStream = stream;
		},
		function(e) { console.log('Didnt work', e); }
	);
} //end beginVideoCapture
