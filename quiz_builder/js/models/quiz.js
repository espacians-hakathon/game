var firebase_ref = null;
var Quiz = {
  dataRef: 'https://luminous-inferno-1274.firebaseio.com/Sessions',
  createQuiz: function(quiz_obj, callback) {
    var myDataRef = new Firebase(this.dataRef);
    var obj = {};
    obj["Questions"] = quiz_obj["questions"];
    firebase_ref = myDataRef.push(obj, callback);
  }
};