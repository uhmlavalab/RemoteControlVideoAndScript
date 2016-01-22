//--------------------------------------------------------------------------------------------------------------------------Global vars
var debug = true;
var wsio;

window.onload = initializeWS;

//--------------------------------------------------------------------------------------------------------------------------Start wsio communcation

function initializeWS() {
	console.log("Initializing controller client");

	// Create a connection to server
	wsio = new WebsocketIO();
	console.log("Websocket status:" + wsio);
	wsio.open(function() {
		console.log("Websocket opened, ending addClient");
		
		wsio.emit('addClient', { "type": "controller"});

		setupListeners(); 
	});

	wsio.on('close', function (evt) {
		alert('Lost connection');
	});

} //end initialize


//--------------------------------------------------------------------------------------------------------------------------
function setupListeners() {
	wsio.on('serverAccepted', function(data) {
		console.log("Accepted by server");
	});

	wsio.on('serverSendingImageToControllers', wsServerSendingImageToControllers);
}



//--------------------------------------------------------------------------------------------------------------------------
function wsServerSendingImageToControllers(data) {

	document.querySelector('img').src = data.image;

} //end wsServerSendingImageToControllers


