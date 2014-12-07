var Session = {
    dataRef: 'https://resplendent-torch-8357.firebaseio.com/Sessions',
    id: QueryString.session_id || "session12245",
    getCurrentPlayerID: function()
    {
        var myDataRef = new Firebase(this.dataRef + '/' + this.id + '/Students');
        userUUID = localStorage.getItem('currentUUID');
        var userRef = myDataRef.child(userUUID);

        userRef.on("value", function(snapshot) {
           currentPlayerID=snapshot.val().ID;
           console.log(snapshot.val().currentRow+1);
           localStorage.setItem("questionIndex",snapshot.val().currentRow+1);
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    },
    fetchSessionQuestions: function() {
        console.log(this.dataRef + '/' + this.id + '/Questions');
        var dataRef = new Firebase(this.dataRef + '/' + this.id + '/Questions'),
            questions;
        // Attach an asynchronous callback to read the data at our posts reference
        dataRef.on("value", function(snapshot) {
            questions = snapshot.val();
            localStorage.setItem("questions", JSON.stringify(questions));
            localStorage.setItem("questionIndex",1);
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    },
    updateUserAnswer: function(pathId, blockType, answer_string, callback) {
        var myDataRef = new Firebase(this.dataRef + '/' + this.id + '/Students');
        userUUID = localStorage.getItem('currentUUID');
        var userRef = myDataRef.child(userUUID);
        var questionRef = myDataRef.child(userUUID).child("Path").child(pathId);
        answer = true;
        if (blockType == "g") {
            answer = true;
        } else if (blockType == "s") {
            answer = false;
        } else {
            answer = "notyet";
        }

        var obj = {
            "State": answer, "choosen_answer": answer_string
        };
        questionRef.update(obj, callback);
        var currentRow = pathId;
        userRef.update({
            "currentRow": currentRow
        }, callback);
    },

    getCurrentPlayers: function() {

        var myDataRef = new Firebase(this.dataRef + '/' + this.id + '/Students'),
            students;
        myDataRef.on("value", function(snapshot) {
            studentsList = snapshot.val();
            // localStorage.setItem("questions",JSON.stringify(questions));
            //console.log(studentsList);

            for (var c in studentsList) {
               // console.log(studentsList[c]);
                if (players[studentsList[c].ID] === undefined) {
                    addCharacter(studentsList[c].Name,studentsList[c].ID, studentsList[c].Character);
                }
                //console.log(players[studentsList[c].ID]);
               // console.log(studentsList[c].ID);
                players[studentsList[c].ID].row = studentsList[c].currentRow;
                players[studentsList[c].ID].targetBlock = studentsList[c].currentRow;
                players[studentsList[c].ID].Path = studentsList[c].Path;
                 for (var p in players[studentsList[c].ID].Path)
                 {
                  // console.log("p="+p+", p length ");
                  // console.log(players[studentsList[c].ID].Path);
                  // console.log(players[studentsList[c].ID].Path[p].QuestionID-1);

                  //if (grid.getBlock(studentsList[c].ID,players[studentsList[c].ID].Path[p].QuestionID-1))
                  var typeOfCurrentBlock =grid.getBlock(studentsList[c].ID,players[studentsList[c].ID].Path[p].QuestionID-1).type;

                  if (getAnswerForBlockType(typeOfCurrentBlock)!=players[studentsList[c].ID].Path[p].State)
                  {
                   grid.setBlock(studentsList[c].ID,
                   players[studentsList[c].ID].Path[p].QuestionID-1,
                   getBlockTypeForAnswer(players[studentsList[c].ID].Path[p].State));
                  }

                  // console.log(grid.getBlock(studentsList[c].ID,players[studentsList[c].ID].Path[p].QuestionID-1));
                  //console.log("getting: " +studentsList[c].ID+","+players[studentsList[c].ID].Path[p].QuestionID-1 );
                    //console.log(players[studentsList[c].ID].Path[p].QuestionID-1);
                  //console.log(studentsList[c].ID+":"+grid.getBlock(studentsList[c].ID,players[studentsList[c].ID].Path[p].QuestionID-1).type);
                 }


            }

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });


    },
    createUser: function(userUuid,userChar, userObj, callback) {
        var myDataRef = new Firebase(this.dataRef + '/' + this.id + '/Students');
        var userRef = myDataRef.child(userUuid);
        questions = JSON.parse(localStorage.getItem("questions"));
        console.log(questions);
        path = {};
        $.each(questions, function(k, v) {
            element = {};
            if (v) {
                element.QuestionID = v.ID;
                element.State = "notyet";
                path[k] = element;
                //console.log(v.ID);
            }
        });
        var studentCount =0;
        var allRef = new Firebase(this.dataRef + '/' + this.id );

        allRef.once('value', function(dataSnapshot) {
            studentCount = dataSnapshot.val().StudentCount;
            userObj.ID = studentCount;
            userObj.Path = path;
            userObj.Character = userChar;
            userObj.TotalScore = 0;
            userObj.currentRow = 0;
            userRef.set(userObj, function(error) {
              if (error) {
                console.log("Data could not be saved." + error);
              } else {
                allRef.update({"StudentCount": studentCount + 1}, callback);
              }
            });
        });
    }
};
