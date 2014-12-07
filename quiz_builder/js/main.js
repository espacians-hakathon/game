$(function(){
  var current_id = 1;
  var counter = 1;
  var question_html = new EJS({ url: 'templates/question.html'}).render({ qid: current_id, counter: counter});
  $(".form-quiz").on('click', '.add_question_button', function(e){
    e.preventDefault();
    current_id += 1;
    counter +=1;
    var question_html = new EJS({ url: 'templates/question.html'}).render({ qid: current_id, counter: counter });
    $("#questions").append(question_html);
  });
  $("#questions").on('click', '.remove_question_button', function(e){
    e.preventDefault();
    counter -=1;
    $("#question_"+ $(this).attr('question_id')).remove();
    $( "span" ).each(function( i ) { this.innerHTML = "Question: "+ (i+1) });
  });
  $("#questions").prepend(question_html);
  $("form").submit(function(){
    if (!$(this).validate())
      return false;
    console.log($(this).serializeJSON());
    quiz_obj = $(this).serializeJSON();
    Quiz.createQuiz(quiz_obj,function(error){
      window.location.href="/game/quiz_builder/success.html?session_id="+ firebase_ref.path.toString().split("/")[2];
    });
  });
});