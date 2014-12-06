function rnd(){
	return Math.floor((Math.random() * 10) + 1);
}
function Question () {
	var a = Math.floor((Math.random() * 10) + 1);
	var b = Math.floor((Math.random() * 10) + 1);
	this.question = a + " + " + b;
	this.answers = [a+b,rnd()+rnd(),rnd()+rnd(),rnd()+rnd()];
}

var questionText;
var showNewQuestion = function(stage){

	container = new createjs.Container();
	questionText = new createjs.Text("", "bold 75px questionFont" ,"#000");
	questionText.y = 20;
	stage.addChild(container);
	stage.addChild(questionText);

};
var container;
function changeQuestion(newText){
	questionText.text = newText;
}

function nextQuestion(){
	var q = new Question();
	questionText.text = q.question;
	questionText.x = stage.canvas.width /2 - questionText.getBounds().width /2;
	container.removeAllChildren();
	for (i = 0; i < q.answers.length; i++) {
		var answer = q.answers[i];
		var text = new createjs.Text(answer, "bold 75px answerFont" ,"#000");
		var bounds = text.getBounds();
		text.x = i * 200 + 200;
		text.y = 120;

		var hit = new createjs.Shape();
		hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
		text.hitArea = hit;

		container.addChild(text);
		text.addEventListener("click", handleClick);
		function handleClick(event) {
			if (q.answers[0] == event.target.text){
			    advanceOneStep(1,"g");
			}else{
				advanceOneStep(1,"s");
			}
			nextQuestion();
		}
	}


}
