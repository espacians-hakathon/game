var Session = {
  dataRef: 'https://luminous-inferno-1274.firebaseio.com/Sessions',
  createQuiz: function(quiz_obj, callback){
    var myDataRef = new Firebase(this.dataRef);
    var obj = {};
    obj["Questions"] = quiz_obj["questions"];
    myDataRef.push(obj, callback);
  }
}