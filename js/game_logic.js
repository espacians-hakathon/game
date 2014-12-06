var blockSize = getImageFactory("1");
var players = [new Character("Ahmed", 0), new Character("Mohamed", 1)];

function getImageFactory(image_type) {
    switch (image_type) {
        case "boy":
            return new createjs.Bitmap("sprites/CharacterBoy.png");
        default:
            return new createjs.Bitmap("sprites/BrownBlock.png");
    }
}


// var canvas = document.getElementById('game');
var stage = new createjs.Stage("game");
// var context = canvas.getContext('2d')//.fillRect(4,4,5,60);
var tileSize = 30;
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
    var grid = new Grid(stage);
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

var swapImage = function(imageObj,imagestring)
{
	var originalX = imageObj.image.x,originalY =imageObj.image.y;
	var image = getImageFactory(imagestring);
	image.x = originalX; image.y = originalY;

	createjs.Tween.get(imageObj.image).to({alpha: 0},2000);

	
	imageObj.image = image;
	stage.addChild(imageObj.image);
	imageObj.image.alpha=0;

	createjs.Tween.get(imageObj.image).to({alpha:255},2000);



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
    swapImage(players[1],"boy");
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

init();

var advanceOneStep = function(player) {
    var character = players[player];
    character.setTargetBlock(character.getTargetBlock() + 1);

};
