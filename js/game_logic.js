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

var stage = new createjs.Stage("game");
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
	block.y = y * 85 + mapMargin;
	stage.addChild(block);
};

var drawMap = function() {
	 stage.canvas.width = window.innerWidth;
    _(map).each(function(row, i) {
        _(row).each(function(tile, j) {
            self.drawTileBlock(tile, i, j); //draw a rectangle at j,i
        });
    });
};

var drawCharacters = function(){
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

var showNewQuestion = function(){
	var img = new Image();
	img.src = "bitmapFont/spritesheet_font.png";
	// Embedded SpriteSheet data.
	var data = {
		"animations": {
			"V": {"frames": [21]},
			"A": {"frames": [0]},
			",": {"frames": [26]},
			"W": {"frames": [22]},
			"B": {"frames": [1]},
			"X": {"frames": [23]},
			"C": {"frames": [2]},
			".": {"frames": [29]},
			"Y": {"frames": [24]},
			"D": {"frames": [3]},
			"Z": {"frames": [25]},
			"E": {"frames": [4]},
			"F": {"frames": [5]},
			"G": {"frames": [6]},
			"H": {"frames": [7]},
			"I": {"frames": [8]},
			"J": {"frames": [9]},
			"K": {"frames": [10]},
			"!": {"frames": [27]},
			"L": {"frames": [11]},
			"M": {"frames": [12]},
			"N": {"frames": [13]},
			"O": {"frames": [14]},
			"P": {"frames": [15]},
			"Q": {"frames": [16]},
			"R": {"frames": [17]},
			"S": {"frames": [18]},
			"T": {"frames": [19]},
			"?": {"frames": [28]},
			"U": {"frames": [20]}
		},
		"images": ["bitmapFont/spritesheet_font.png"],
		"frames": [
			[155, 2, 25, 41, 0, -10, -3],
			[72, 2, 28, 43, 0, -8, -1],
			[599, 2, 28, 38, 0, -8, -4],
			[41, 2, 27, 44, 0, -8, -1],
			[728, 2, 32, 38, 0, -6, -4],
			[184, 2, 35, 41, 0, -4, -2],
			[409, 2, 30, 39, 0, -7, -3],
			[443, 2, 29, 39, 0, -7, -3],
			[901, 2, 13, 35, 0, -8, -5],
			[698, 2, 26, 38, 0, -9, -4],
			[666, 2, 28, 38, 0, -8, -4],
			[764, 2, 23, 38, 0, -10, -4],
			[828, 2, 37, 36, 0, -3, -5],
			[567, 2, 28, 38, 0, -8, -4],
			[519, 2, 44, 38, 0, 1, -4],
			[869, 2, 28, 36, 0, -8, -5],
			[476, 2, 39, 38, 0, -2, -4],
			[371, 2, 34, 39, 0, -5, -3],
			[631, 2, 31, 38, 0, -6, -4],
			[289, 2, 39, 40, 0, -2, -3],
			[918, 2, 31, 32, 0, -6, -7],
			[791, 2, 33, 37, 0, -5, -4],
			[2, 2, 35, 46, 0, -4, 1],
			[253, 2, 32, 40, 0, -6, -3],
			[104, 2, 32, 43, 0, -6, -1],
			[332, 2, 35, 39, 0, -5, -4],
			[953, 2, 9, 16, 0, -17, -29],
			[140, 2, 11, 41, 0, -16, -1],
			[223, 2, 26, 41, 0, -7, -1],
			[966, 2, 9, 10, 0, -17, -31]
		]
	};

	img.onload = function () {
		var ss = new createjs.SpriteSheet(data);
		text = new createjs.BitmapText("Question one ,\n Who are you ?!", ss);
		stage.addChild(text);
	};
}
var text;
var init = function() {
    drawGradient();
    drawMap();
    drawCharacters();
    showNewQuestion();
};

createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
 	for (var i = players.length - 1; i >= 0; i--) {
 		var player = players[i];
 		var image =  player.getImage();
 		var target_y = player.getTargetBlock() * blockSize.getBounds().height / 2 - 50 + mapMargin;

 		var image = player.getImage();
 		image.y += 10;
 		if(image.y >=target_y ) image.y = target_y;
 	}
     stage.update();
}

init();

var advanceOneStep = function(player){
	var character = players[player];
	character.setTargetBlock(character.getTargetBlock() + 1);
};