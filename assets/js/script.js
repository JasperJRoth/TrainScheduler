var firebaseConfig = {
    apiKey: "AIzaSyDgFu5jD9oPZRbjuz4-jwa6LmR43YGgclM",
    authDomain: "train-scheduler-d2801.firebaseapp.com",
    databaseURL: "https://train-scheduler-d2801.firebaseio.com",
    projectId: "train-scheduler-d2801",
    storageBucket: "",
    messagingSenderId: "494279263077",
    appId: "1:494279263077:web:1662f74b37eb3591"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var trains = [];

function createTrainObj(){
    var name = $("#train_name").val().trim();
    var destination = $("#train_destination").val().trim();
    var frequency = $("#train_frequency").val();
    var startTime = Date.now();

    if(name.length < 3){
        M.toast({html: "Name must be longer than 3 characters"});
        return;
    }

    if(destination.length < 3){
        M.toast({html: "Destination name must be longer than 3 characters"});
        return;
    }

    var trainObj = {
        name: name,
        destination: destination,
        frequency: frequency,
        startTime: startTime
    }

    addTrain(trainObj);
    trains.push(trainObj);
    displayTrains();
}

function getTrains(){
    var getFromFirebase = firebase.functions().httpsCallable('getTrains');

    getFromFirebase().then(function(result){
        result.data.forEach(function(train){
            trains.push(JSON.parse(train));
            displayTrains();
        })
    });
}

function addTrain(train){
    var addToFirebase = firebase.functions().httpsCallable('addTrain');

    addToFirebase(JSON.stringify(train)).then(function(result){
        console.log("Train has been added.")
    })
}

function displayTrains(){
    var table = $("#train_table");
    $(".trainData").remove();

    trains.forEach(function(train){
        
        var diff = Date.now() - new Date(train.startTime);
        var nextArrival = new Date(Date.now() + (diff % (train.frequency * 60000)));
        var minTill = (nextArrival - Date.now()) / 60000;

        table.append($(`
        <tr class="trainData">
            <td>${train.name}</td>
            <td>${train.destination}</td>
            <td>${train.frequency}</td>
            <td>${nextArrival.getHours()}:${nextArrival.getMinutes() < 10 ? "0" + nextArrival.getMinutes() : nextArrival.getMinutes()}</td>
            <td>${Math.floor(minTill)}</td>
        </tr>`));
    });
}

$(document).ready(function(){
    getTrains();

    setInterval(function(){
        displayTrains()
    }, 3000)
})
