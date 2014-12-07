var firebase;
var dataRef = "https://resplendent-torch-8357.firebaseio.com/Sessions";
var studentData;

function fetchStudents() {
    console.log(dataRef + '/' + QueryString.session_id + '/Students');
    var studentRef = new Firebase(dataRef + '/' + QueryString.session_id + '/Students');



    studentRef.on("value", function(snapshot) {
        console.log(snapshot.val());

        studentData = snapshot.val();
        var html = new EJS({
            url: 'quiz_builder/templates/progress-table.html'
        }).render({
            cityName: "false",
            data: studentData
        });


        document.getElementById('progressDiv').innerHTML = html;


    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}
var ref = new Firebase("https://resplendent-torch-8357.firebaseio.com/");
ref.authAnonymously(function(error, authData) {
    if (error) {
        console.log("ERROR");
    } else {
        fetchStudents();
    }
});
