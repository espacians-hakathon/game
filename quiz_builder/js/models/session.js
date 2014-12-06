var Session = {
    dataRef: 'https://resplendent-torch-8357.firebaseio.com/Sessions',
    id: 'session12245',
    createQuiz: function(quiz_obj, callback) {
        var myDataRef = new Firebase(this.dataRef);
        var obj = {};
        obj["Questions"] = quiz_obj["questions"];
        myDataRef.push(obj, callback);
    },
    fetchSessionQuestions: function() {
        var dataRef = new Firebase(this.dataRef + '/' + this.id + '/Questions'),questions;


        // Attach an asynchronous callback to read the data at our posts reference
        dataRef.on("value", function(snapshot) {
          questions=snapshot.val();
          localStorage.setItem("questions",JSON.stringify(questions));
            console.log(questions);
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });


    },
    updateUserAnswer: function(pathId, blockType, callback) {
        var myDataRef = new Firebase(this.dataRef + '/' + this.id + '/Students');
        // var user = myDataRef.getAuth();
        // console.log('................');
        // console.log(user.uid);
        // console.log('................');
        // var questionRef = myDataRef.child(user.uid).child("Path").child(pathId);
        var questionRef = myDataRef.child("22").child("Path").child(pathId);
        answer = true;
        if (blockType == "g") {
            answer = true;
        } else if (blockType == "s") {
            answer = false;
        } else {
            answer = "notyet";
        }
        var obj = {
            "State": answer
        };
        questionRef.update(obj, callback);
    },
    createUser: function(userUuid, userObj, callback) {
        var myDataRef = new Firebase(this.dataRef + '/' + this.id + '/Students');
        // var user = myDataRef.getAuth();
        // console.log('................');
        // console.log(user.uid);
        // console.log('................');
        var userRef = myDataRef.child(userUuid);
        // var userRef = myDataRef.child("22")
        userRef.set(userObj, function onComplete() {
            showAlert({
                title: 'Successfully saved!',
                detail: 'You are still logged in',
                className: 'alert-success'
            });
        });
    }
}
