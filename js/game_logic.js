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

function getImageFactory(image_type){
	switch(image_type) {
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
var blockSize = getImageFactory("1");
var players = [new Character("Ahmed",0),new Character("Mohamed",1)];
var stage = new createjs.Stage("game");
var tileSize = 30;
var map = [
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
					["g","s","b","b","b","b","b","b"],
					["g","s","g","g","s","b","b","b"],
];

var drawTileBlock = function(image_type, x, y){
	var block = getImageFactory(image_type);
	block.x = x * 100;
	block.y = y * 85;
	stage.addChild(block)
};


var drawMap = function(){
  _(map).each(function(row,i){
    _(row).each(function(tile,j){
        self.drawTileBlock(tile,i,j); //draw a rectangle at j,i
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

var init = function(){
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