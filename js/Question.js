function rnd() {
    return Math.floor((Math.random() * 10) + 1);
}

function Question() {
    this.question = questions[questionIndex].Question;
    this.answers = questions[questionIndex].Answers;
    this.correct = questions[questionIndex].Answers['correct'];
    delete this.answers['correct'];
}

var questionText,
    answersContainer,
    questions,
    questionIndex;

questionIndex = localStorage.getItem("questionIndex");
if (questionIndex === 0 || questionIndex === null) {
    questionIndex = 1;
    localStorage.setItem("questionIndex", questionIndex);
}

var initQuestions = function(stage) {
    questions = JSON.parse(localStorage.getItem("questions"));
    answersContainer = new createjs.Container();
    questionText = new createjs.Text("", "bold 65px questionFont", "#000");
    questionText.y = 20;
    questionText.x = 20;
    stage.addChild(answersContainer);
    stage.addChild(questionText);
};

function nextQuestion() {
    localStorage.setItem("questionIndex", questionIndex);
    if (questionIndex >= questions.length) {
        answersContainer.removeAllChildren();
        if (currentPlayerSCORE>0)
        questionText.text = "Good Luck, you scored " + currentPlayerSCORE + " points!";
    else 
    	 questionText.text = "Good Luck!";
        if (typeof players[currentPlayerID] !== "undefined") players[currentPlayerID].jump();
        return;
    }
    var q = new Question();
    questionText.text = q.question;
    questionText.x = stage.canvas.width / 2 - questionText.getBounds().width / 2;
    answersContainer.removeAllChildren();
    var answersWidth = 0;
    for (ans in q.answers) {
        var answer = q.answers[ans];
        var text = new createjs.Text(answer, "bold 55px answerFont", "#000");
        bounds = text.getBounds();
        text.x = bounds.width + answersWidth;
        answersWidth = text.x + bounds.width;
        text.y = 120;

        var rect = new createjs.Rectangle(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
        var shape = new createjs.Shape(rect);

        var border = new createjs.Shape();
        border.graphics.beginFill("#f90").drawRect(text.x - 10, text.y - 10, text.getMeasuredWidth() + 20, text.getMeasuredHeight() + 20);
        border.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        answersContainer.addChild(border);

        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
        text.hitArea = hit;
        answersContainer.addChild(text);

        function handleClick(event) {
            var blockType;
            if (q.answers[q.correct] == event.target.text) {
                blockType = "g";
                currentPlayerSCORE += 10;
                //console.log("CURRNETSCORE: "+currentPlayerSCORE);
            } else {
                blockType = "s";
            }
            advanceOneStep(currentPlayerID, blockType, event.target.text);
            nextQuestion();
        }
        text.addEventListener("click", handleClick);
    }
    questionIndex++;
}
