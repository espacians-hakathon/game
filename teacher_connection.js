var firebase;
var dataRef = "https://resplendent-torch-8357.firebaseio.com/Sessions";
var studentData;

function fetchStudents() {
    console.log(dataRef + '/' + QueryString.session_id + '/Students');
    var studentRef = new Firebase(dataRef + '/' + QueryString.session_id + '/Students');



    studentRef.on("value", function(snapshot) {
        //console.log(snapshot.val());

       
        //studentData = {"anonymous:-Jc___tQw8Q5Sb_uPFCj":{"Character":"boy","ID":5,"Name":"kokkokoko","Path":[null,{"QuestionID":1,"State":true},{"QuestionID":2,"State":"notyet"},{"QuestionID":3,"State":"notyet"},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":1},"anonymous:-Jc__hKxX_cPEIffzYSq":{"Character":"boy","ID":0,"Name":"YMG","Path":[null,{"QuestionID":1,"State":"notyet"},{"QuestionID":2,"State":"notyet"},{"QuestionID":3,"State":"notyet"},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":0},"anonymous:-Jc_a4xIzDQDVL0meXjA":{"Character":"boy","ID":1,"Name":"YASMINE","Path":[null,{"QuestionID":1,"State":"notyet"},{"QuestionID":2,"State":"notyet"},{"QuestionID":3,"State":"notyet"},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":0},"anonymous:-Jc_aOMoO1aq7qalyNo_":{"Character":"boy","ID":2,"Name":"YMG","Path":[null,{"QuestionID":1,"State":"notyet"},{"QuestionID":2,"State":"notyet"},{"QuestionID":3,"State":"notyet"},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":0},"anonymous:-Jc_ak23Bc28EK9J4b0T":{"Character":"boy","ID":3,"Name":"AHMED","Path":[null,{"QuestionID":1,"State":"notyet"},{"QuestionID":2,"State":"notyet"},{"QuestionID":3,"State":"notyet"},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":0},"anonymous:-Jc_b39Lyn4HKNb-DZYV":{"Character":"girl","ID":4,"Name":"Basayel","Path":[null,{"QuestionID":1,"State":true},{"QuestionID":2,"State":true},{"QuestionID":3,"State":false},{"QuestionID":4,"State":true}],"TotalScore":0,"currentRow":4},"anonymous:-Jc_bhMF4x7djmKIHgmy":{"Character":"boy","ID":6,"Name":"YOMNA","Path":[null,{"QuestionID":1,"State":true},{"QuestionID":2,"State":false},{"QuestionID":3,"State":true},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":3},"anonymous:-Jc_eILUiEqctYnuj7m7":{"Character":"boy","ID":7,"Name":"jk","Path":[null,{"QuestionID":1,"State":false},{"QuestionID":2,"State":false},{"QuestionID":3,"State":true},{"QuestionID":4,"State":false}],"TotalScore":0,"currentRow":4},"anonymous:-Jc_ljcwqO0bw1MIrxq0":{"Character":"boy","ID":8,"Name":"7amada","Path":[null,{"QuestionID":1,"State":"notyet"},{"QuestionID":2,"State":"notyet"},{"QuestionID":3,"State":"notyet"},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":0},"anonymous:-Jc_o8q5pGa7vbGN62p5":{"Character":"boy","ID":9,"Name":"asasddd","Path":[null,{"QuestionID":1,"State":"notyet"},{"QuestionID":2,"State":"notyet"},{"QuestionID":3,"State":"notyet"},{"QuestionID":4,"State":"notyet"}],"TotalScore":0,"currentRow":0}};
        studentData = snapshot.val();
        var sortable = [];
        for (var c in studentData)
            sortable.push([c, studentData[c].Score]);
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

       




        console.log(studentData);
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
