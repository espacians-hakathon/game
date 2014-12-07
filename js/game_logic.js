var blockSize = getImageFactory("1");
var players = {};
var grid;
var gridContainer = new createjs.Container();
var characterContainer = new createjs.Container();
var studentsList;

var currentPlayerID;
var currentPlayerSCORE = 0;

function getImageFactory(image_type) {
    switch (image_type) {
        case "boy":
            return new createjs.Bitmap("sprites/CharacterBoy.png");
        case "girl":
            return new createjs.Bitmap("sprites/CharacterPinkGirl.png");
        case "horn":
            return new createjs.Bitmap("sprites/CharacterHornGirl.png");
        case "pr":
            return new createjs.Bitmap("sprites/CharacterPrincessGirl.png");
        case "cat":
            return new createjs.Bitmap("sprites/CharacterCatGirl.png");
        default:
            return new createjs.Bitmap("sprites/BrownBlock.png");
    }
}

var stage = new createjs.Stage("game");
stage.scaleX = 0.75;
stage.scaleY = 0.75;
var mapTopMargin = 250; // Margin to push map to view sky
var mapLeftMargin = 150;
var map = []

var drawMap = function() {
    questions = JSON.parse(localStorage.getItem("questions"));
    stage.canvas.width = window.innerWidth;
    grid = new Grid(stage);
    var path = [];
    for (var i = questions.length - 2; i >= 0; i--) {
        path.push("b");
    };
    path.push("end")
    for (var i = 10 - 1; i >= 0; i--) {
        map.push(path);
    };
    _(map).each(function(row, i) {
        grid.addColumn(row);
    });
    stage.addChild(gridContainer);
};

var drawCharacters = function() {
    for (var i = players.length - 1; i >= 0; i--) {
        var player = players[i];

        characterContainer.addChild(player.image);
        characterContainer.addChild(player.nameText);
        stage.addChild(characterContainer);
    }
};

var addCharacter = function(name, ID, img) {
    var character = new Character(name, ID, img);
    players[ID] = character;
    characterContainer.addChild(character.image);
    characterContainer.addChild(character.nameText);
};

var drawGradient = function() {
    var canvas = document.getElementById('game');
    var context = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
    var graphicsShape = new createjs.Graphics().beginLinearGradientFill(["rgba(25,225,255,1)", "rgba(255,255,255,1)"], [0.4, 1], 0, 0, 0, 230).drawRoundRect(0, 0, window.innerWidth * 2, canvas.height, 5);
    var g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
    g.beginFill(createjs.Graphics.getRGB(255, 0, 0));
    g.drawCircle(0, 0, 3);

    var s = new createjs.Shape(graphicsShape);
    s.x = 0;
    s.y = 0;
    stage.addChild(s);
};

var formatContainers = function() {
    var stageWidth = stage.getBounds().width / 3;
    gridContainer.x += stageWidth;
    characterContainer.x += stageWidth;
    characterContainer.y += mapTopMargin;
    gridContainer.y += mapTopMargin;
    stage.addChild(characterContainer);
};

var init = function() {
    Session.getCurrentPlayerID();
    drawGradient();
    drawMap();
    drawCharacters();
    initQuestions(stage);
    nextQuestion();
    formatContainers();

    Session.getCurrentPlayers();
};

createjs.Ticker.addEventListener("tick", handleTick);

function getBlockTypeForAnswer(ans) {
    if (ans === true) return 'g';
    else if (ans === false) return 's';
    else return 'b';

}

function getAnswerForBlockType(type) {
    if (type === 'g') return true;
    else if (type === 's') return false;
    else return 'notyet';

}

function handleTick(event) {
    grid.getBlock(8, 0);
    for (var id in players) {
        var player = players[id];
        var image = player.getImage();
        var target_y = player.getTargetBlock() * blockSize.getBounds().height / 2 - 50;
        image.y += 10;
        player.nameText.y += 10;
        if (image.y >= target_y) {
            player.nameText.y = target_y + player.nameText.getBounds().height * 2;
            image.y = target_y;
        }
    }
    stage.update();
}

var advanceOneStep = function(player, block_type, answer) {
    var character = players[currentPlayerID];
    Session.updateUserAnswer(character.getRow() + 1, block_type, answer, function(error) {
        console.log(error);
    });
};

init();
