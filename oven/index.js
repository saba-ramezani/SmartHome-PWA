var topic;


function startConnect(device, macAddr){

    clientId = "clientId - " + parseInt(Math.random() * 100);

    host = '212.33.199.186';   
    port = '8083';  
    userId  = "reza";  
    passwordId = "1234";  


    console.log("Connecting to " + host + " on port " + port);
    console.log("Using the client Id " + clientId);

    client = new Paho.MQTT.Client(host , Number(port) , clientId);


    topic = "reza/" + device + "/" + macAddr + "/key";


    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
        userName: userId,
        password: passwordId
    });
}


function onConnect(){
    client.subscribe(topic);
    console.log("Subscribing to topic " + topic);
}


function onConnectionLost(responseObject){
    console.log("ERROR: Connection is lost.");
    if(responseObject !=0){
        console.log("ERROR:"+ responseObject.errorMessage);
    }
}

function onMessageArrived(message){
    console.log("Topic: " + message.destinationName + " | Message : " + message.payloadString);
}


function startDisconnect(){
    client.disconnect();
    console.log("Disconnected!");
}



function publishMessage(keyName){
    msg = "{\"optkey\":\"" + keyName + "\"}";
    Message = new Paho.MQTT.Message(msg);
    Message.destinationName = topic;
    client.send(Message);
    console.log("Message " + msg + " to topic " + topic + " is sent");
}
