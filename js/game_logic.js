var blockSize = getImageFactory("1");
var players = [new Character("Ahmed", 0), new Character("Mohamed", 1)];
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
var mapMargin = 150; // Margin to push map to view sky
var map = [
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
    ["g", "s", "b", "b", "b", "b", "b", "b"],
    ["g", "s", "g", "g", "s", "b", "b", "b"],
];

var drawTileBlock = function(image_type, x, y) {
    var block = getImageFactory(image_type);
    block.x = x * 100;
    block.y = y * 85 + mapMargin;
    stage.addChild(block);
};

var drawMap = function() {
    stage.canvas.width = window.innerWidth;
    grid = new Grid(stage);
    _(map).each(function(row, i) {
        grid.addColumn(row)
    });
};

var drawCharacters = function() {
    for (var i = players.length - 1; i >= 0; i--) {
        var player = players[i];
        console.log(player);
        var image = new createjs.Bitmap("sprites/CharacterPinkGirl.png");
        image.x = player.getColumn() * 100;
        image.y = -50 + mapMargin;
        player.setImage(image);
        stage.addChild(image);
    }
};

var swapImage = function(imageObj, imagestring) {
    console.log(imageObj);
    var originalX = imageObj.image.x,
        originalY = imageObj.image.y;
    var image = getImageFactory(imagestring);
    image.x = originalX;
    image.y = originalY;

    createjs.Tween.get(imageObj.image).to({
        alpha: 0.5
    }, 500).call(function() {

        stage.removeChild(imageObj.image);
        imageObj.image = image;
        imageObj.image.alpha = 0.5;
        stage.addChild(imageObj.image);


        createjs.Tween.get(image).to({
            alpha: 1
        }, 500);
    });
};

var swapSprite = function(imageObj, imagestring,z) {
  console.log(imageObj);
    var originalX = imageObj.sprite.x,
        originalY = imageObj.sprite.y;
    var image = getBlockFactory(imagestring);
    image.x = originalX;
    image.y = originalY;

createjs.Tween.get(imageObj.sprite).to({y:-1000}, 500, createjs.Ease.getElasticInOut(1000,1000)).call(function() {
		console.log("removing");
        stage.removeChild(imageObj.sprite);
        imageObj.sprite = image;
        image.y = -1000;
        stage.addChild(imageObj.sprite);
        stage.setChildIndex(imageObj.sprite, z);


createjs.Tween.get(image).to({y:originalY}, 500, createjs.Ease.getElasticInOut(100,5000));
    });

};


var drawGradient = function() {
    var canvas = document.getElementById('game');
    var context = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
    var graphicsShape = new createjs.Graphics().beginLinearGradientFill(["rgba(25,225,255,1)", "rgba(255,255,255,1)"], [0, 1], 0, 0, 0, 130).drawRoundRect(0, 0, window.innerWidth, canvas.height, 5);
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
    swapImage(players[1], "boy");
    showNewQuestion(stage);
    nextQuestion()
};

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
    for (var i = players.length - 1; i >= 0; i--) {
        var player = players[i];
        var image = player.getImage();
        var target_y = player.getTargetBlock() * blockSize.getBounds().height / 2 - 50 + mapMargin;
        //console.log(target_y);
        image.y += 10;
        if (image.y >= target_y) image.y = target_y;
    }
    stage.update();
}

var advanceOneStep = function(player) {
    var character = players[player];
    grid.setBlock(character.getColumn(),character.getRow(),"g");
    character.setTargetBlock(character.getTargetBlock() + 1);
};

init();
