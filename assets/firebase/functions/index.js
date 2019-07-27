const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp()

var db = admin.database()

exports.addTrain = functions.https.onCall(function(data, context){
    var newRef = db.ref("trains").push();
    newRef.set(data);
    return;
});

exports.getTrains = functions.https.onCall(function(data, context){
    return db.ref("trains").orderByKey().once("value").then(function(snap){
        var trains = [];
        snap.forEach(function(childSnap){
            console.log(childSnap);
            trains.push(childSnap.val());
        });
        return trains;
    });
});