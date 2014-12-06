function rnd() {
    return Math.floor((Math.random() * 10) + 1);
}

function Question() {
    var a = Math.floor((Math.random() * 10) + 1);
    var b = Math.floor((Math.random() * 10) + 1);
    this.question = a + " + " + b;
    this.question = questions[questionIndex].Question;
    this.answers = questions[questionIndex].Answers;
    this.correct= questions[questionIndex].Answers['correct'];
    console.log("here:");
    console.log(questions[questionIndex].Answers);
    questionIndex++;
    //this.answers = [a + b, rnd() + rnd(), rnd() + rnd(), rnd() + rnd()];
}

var questionText,
    answersContainer,
    questions,
    questionIndex=1;
var initQuestions = function(stage) {
    questions = JSON.parse(localStorage.getItem("questions"));
    console.log(questions);
    answersContainer = new createjs.Container();
    questionText = new createjs.Text("", "bold 75px questionFont", "#000");
    questionText.y = 20;
    stage.addChild(answersContainer);
    stage.addChild(questionText);
};

function nextQuestion() {
    var q = new Question();
    questionText.text = q.question;
    questionText.x = stage.canvas.width / 2 - questionText.getBounds().width / 2;
    answersContainer.removeAllChildren();
    //console.log(q.answers.size());
    for (i = 1; i <= 4; i++) {
        var answer = q.answers[i];
        console.log(q.correct);
        var text = new createjs.Text(answer, "bold 75px answerFont", "#000");
        var bounds = text.getBounds();
        text.x = i * 200 + 200;
        text.y = 120;

        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
        text.hitArea = hit;

        answersContainer.addChild(text);
        text.addEventListener("click", handleClick);

        function handleClick(event) {
            if ( q.answers[q.correct] == event.target.text) {
                advanceOneStep(1, "g");
            } else {
                advanceOneStep(1, "s");
            }
            nextQuestion();
        }
    }
}
