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

function createTrainObj(){
    var name = $("#train_name").val().trim();
    var destination = $("#train_destination").val().trim();
    var frequency = $("#train_frequency").val();
    var startTime = new Date();

    if(name.length < 3){
        M.toast({html: "Name must be longer than 3 characters"});
    }

    if(destination.length < 3){
        M.toast({html: "Destination name must be longer than 3 characters"});
    }

    var trainObj = {
        name: name,
        destination: destination,
        frequency: frequency,
        startTime: startTime
    }

    console.log(trainObj);
}