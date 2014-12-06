var Session = {
  dataRef: 'https://resplendent-torch-8357.firebaseio.com/Sessions',
  id: 'session12245',
  createQuiz: function(quiz_obj, callback){
    var myDataRef = new Firebase(this.dataRef);
    var obj = {};
    obj["Questions"] = quiz_obj["questions"];
    myDataRef.push(obj, callback);
  },
  updateUserAnswer: function(pathId, answer, callback){
    var myDataRef = new Firebase(this.dataRef+'/'+this.id+'/Students');
    // var user = rootRef.getAuth();
    // var questionRef = myDataRef.child(user.uid).child("Path").child(pathId);
    var questionRef = myDataRef.child("22").child("Path").child(pathId);
    var obj = {"State": answer};
    questionRef.update(obj, callback); 
  }
}