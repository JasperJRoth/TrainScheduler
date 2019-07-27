
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