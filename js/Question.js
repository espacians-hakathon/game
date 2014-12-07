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
    //console.log("here:");
    //console.log(questions[questionIndex].Answers);
    questionIndex++;
    //this.answers = [a + b, rnd() + rnd(), rnd() + rnd(), rnd() + rnd()];
}

var questionText,
    answersContainer,
    questions,
    questionIndex=1,
    bounds={width:0,height:0};
    bounds.width=0;
    bounds.height=0;
var initQuestions = function(stage) {
    questions = JSON.parse(localStorage.getItem("questions"));
    //console.log(questions);
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
    bounds.width=0;
    bounds.height=0;
    //console.log(q.answers.size());
    for (i = 1; i <= 4; i++) {
        var answer = q.answers[i];
        //console.log(q.correct);
        var text = new createjs.Text(answer, "bold 55px answerFont", "#000");
         if (i==1)   bounds = text.getBounds();
        //console.log(bounds.width);
        text.x = i*200 + bounds.width;
        text.y = 120;

        bounds = text.getBounds();

        var rect = new createjs.Rectangle(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
        var shape = new createjs.Shape(rect);

        var border = new createjs.Shape();
        border.graphics.beginFill("#ccc").drawRect(text.x - 10, text.y -10, text.getMeasuredWidth() +20, text.getMeasuredHeight()+20);
        border.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        answersContainer.addChild(border);

        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
        text.hitArea = hit;
        answersContainer.addChild(text);
        text.addEventListener("click", handleClick);

        function handleClick(event) {
            if ( q.answers[q.correct] == event.target.text) {
                advanceOneStep(currentPlayerID, "g");
            } else {
                advanceOneStep(currentPlayerID, "s");
            }
            nextQuestion();
        }
    }
}
