var blockSize = getImageFactory("1");
var players = [new Character("Ahmed", 0), new Character("Mohamed", 1), new Character("Basayel", 3)];
var grid;

function getImageFactory(image_type) {
    switch (image_type) {
        case "boy":
            return new createjs.Bitmap("sprites/CharacterBoy.png");
        default:
            return new createjs.Bitmap("sprites/BrownBlock.png");
    }
}

var stage = new createjs.Stage("game");
var mapTopMargin = 150; // Margin to push map to view sky
var map = [
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
    ["b", "s", "b", "b", "b", "b", "b", "b"],
    ["b", "s", "b", "b", "s", "b", "b", "b"],
];

var drawMap = function() {
    stage.canvas.width = window.innerWidth;
    grid = new Grid(stage);
    _(map).each(function(row, i) {
        grid.addColumn(row);
    });
};

var drawCharacters = function() {
    for (var i = players.length - 1; i >= 0; i--) {
        var player = players[i];
        stage.addChild(player.image);
        stage.addChild(player.nameText);
    }
};

var drawGradient = function() {
    var canvas = document.getElementById('game');
    var context = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
    var graphicsShape = new createjs.Graphics().beginLinearGradientFill(["rgba(25,225,255,1)", "rgba(255,255,255,1)"], [0.4, 1], 0, 0, 0, 130).drawRoundRect(0, 0, window.innerWidth, canvas.height, 5);
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

var init = function() {
    drawGradient();
    drawMap();
    drawCharacters();
    initQuestions(stage);
    nextQuestion();
};

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
    for (var i = players.length - 1; i >= 0; i--) {
        var player = players[i];
        var image = player.getImage();
        var target_y = player.getTargetBlock() * blockSize.getBounds().height / 2 - 50 + mapTopMargin;
        image.y += 10;
        player.nameText.y += 10 ;
        if (image.y >= target_y) {
            player.nameText.y = target_y + player.nameText.getBounds().height*2;
            image.y = target_y;
        }
    }
    stage.update();
}

var advanceOneStep = function(player, block_type) {
    var character = players[player];
    grid.setBlock(character.getColumn(),character.getRow(),block_type);
    character.setTargetBlock(character.getTargetBlock() + 1);
    Session.updateUserAnswer(character.getRow(), block_type, function(error){
        console.log(error);
    });
};

init();
