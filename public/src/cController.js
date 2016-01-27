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


//--------------------------------------------------------------------------------------------------------------------------
function tellServerRunScript() {

	wsio.emit('runScriptOnServer', { "script" : "does not exist, what happens?"});

}

function tellServerRunCommand() {

	wsio.emit('runCommandOnServer', { "command" : "ls" });

}

function tellServerOff1000 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk q" });  }
function tellServerOff0100 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk w" });  }
function tellServerOff0010 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk e" });  }
function tellServerOff0001 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk r" });  }



function tellServerOn1000 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk a" });  }
function tellServerOn0100 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk s" });  }
function tellServerOn0010 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk d" });  }
function tellServerOn0001 () {  wsio.emit('runCommandOnServer', { "command" : "scripts\\keypass.ahk f" });  }









