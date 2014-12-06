function Character (name,column) {
    this.name = name;
    this.column = column;
    this.row = 0;
    this.targetBlock = this.row;
}
Character.prototype.setImage = function(image) {
    this.image = image;
};
Character.prototype.getImage = function(image) {
    return this.image;
};
Character.prototype.getColumn = function(image) {
    return this.column;
};
Character.prototype.getName = function() {
    return this.name;
};
Character.prototype.getRow = function() {
    return this.row;
};
Character.prototype.addOneRow = function() {
    this.row += 1;
};
Character.prototype.getTargetBlock = function() {
    return this.targetBlock;
};

Character.prototype.setTargetBlock = function(_targetBlock) {
    this.targetBlock = _targetBlock;
};

var blockSize = getImageFactory("1");
var players = [new Character("Ahmed",0),new Character("Mohamed",1)];

function getImageFactory(image_type) {
    switch (image_type) {
        case "g":
            return new createjs.Bitmap("sprites/GrassBlock.png");
        case "s":
            return new createjs.Bitmap("sprites/DirtBlock.png");
        case "b":
            return new createjs.Bitmap("sprites/BrownBlock.png");
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

var drawTileBlock = function(image_type, x, y){
	var block = getImageFactory(image_type);
	block.x = x * 100;
	block.y = y * 85;
	stage.addChild(block)
}

var drawMap = function() {
    _(map).each(function(row, i) {
        _(row).each(function(tile, j) {
            self.drawTileBlock(tile, i, j); //draw a rectangle at j,i
        });
    });
};

var drawCharacters = function(){
	for (var i = players.length - 1; i >= 0; i--) {
		var player = players[i]
		console.log(player)
		var image = new createjs.Bitmap("sprites/CharacterPinkGirl.png");
		image.x = player.getColumn() * 100;
		image.y = -50;
		player.setImage(image)
		stage.addChild(image)
	};
}

var drawGradient = function() {
    var canvas = document.getElementById('game');
    var context = new createjs.Rectangle(0, 0, canvas.width, canvas.height);
    var graphicsShape = new createjs.Graphics().beginLinearGradientFill(["rgba(25,225,255,1)", "rgba(255,255,255,1)"], [0, 1], 0, 0, 0, 130).drawRoundRect(0, 0, canvas.width, canvas.height, 5);
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
};

createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
 	for (var i = players.length - 1; i >= 0; i--) {
 		var player = players[i]
 		var image =  player.getImage()
 		var target_y = player.getTargetBlock() * blockSize.getBounds().height / 2 - 50;

 		var image = player.getImage();
 		image.y += 10;
 		if(image.y >=target_y ) image.y = target_y
 	};
     stage.update();
}

init();

var advanceOneStep = function(player){
	var character = players[player]
	character.setTargetBlock(character.getTargetBlock() + 1)
}