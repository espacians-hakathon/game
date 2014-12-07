var blockSize = getImageFactory("1");
var players = {}; // [new Character("Ahmed", 0, 'boy'), new Character("Mohamed", 1, 'boy'), new Character("Basayel", 2, 'girl')];
var grid;
var gridContainer = new createjs.Container();
var characterContainer = new createjs.Container();
var studentsList;


var currentPlayerID = 3;

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
var mapTopMargin = 200; // Margin to push map to view sky
var mapLeftMargin = 150;
var map = [
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
];

var drawMap = function() {
    stage.canvas.width = window.innerWidth;
    grid = new Grid(stage);
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
        characterContainer.addChild(player.nameTextStroke);
        stage.addChild(characterContainer);
    }
};


var refreshCharacters = function() {

};

var addCharacter = function(name, ID, img) {
    //console.log("adding char");
    var character = new Character(name, ID, img);
    players[ID] = character;
    //console.log(players);
    characterContainer.addChild(character.image);
     characterContainer.addChild(character.nameTextStroke);
    characterContainer.addChild(character.nameText);




};

var drawGradient = function() {
    var canvas = document.getElementById('game');
    var context = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
    var graphicsShape = new createjs.Graphics().beginLinearGradientFill(["rgba(25,225,255,1)", "rgba(255,255,255,1)"], [0.4, 1], 0, 0, 0, 130).drawRoundRect(0, 0, window.innerWidth * 2, canvas.height, 5);
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
    characterContainer.x += mapLeftMargin;
    gridContainer.x += mapLeftMargin;
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


    // addCharacter("Hossam", "boy");
    // addCharacter("Yasmine", "horn");
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
        player.nameTextStroke.x = player.nameText.x;
        player.nameTextStroke.y = player.nameText.y;
    }
    stage.update();
}

var advanceOneStep = function(player, block_type) {
    console.log(players);
    var character = players[currentPlayerID];
    //grid.setBlock(character.getColumn(), character.getRow(), block_type);
    //character.setTargetBlock(character.getTargetBlock() + 1);
    Session.updateUserAnswer(character.getRow() + 1, block_type, function(error) {
        console.log(error);
    });
};

init();
