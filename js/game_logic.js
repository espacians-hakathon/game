function getImageFactory(image_type){
	switch(image_type) {
    case "g":
        return new createjs.Bitmap("sprites/GrassBlock.png");
        break;
    case "s":
        return new createjs.Bitmap("sprites/DirtBlock.png");
        break;
    case "b":
    		return new createjs.Bitmap("sprites/BrownBlock.png");
    		break;
    default:
        return new createjs.Bitmap("sprites/BrownBlock.png");
	}
}


// var canvas = document.getElementById('game');
 var stage = new createjs.Stage("game");
// var context = canvas.getContext('2d')//.fillRect(4,4,5,60);
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
	console.log(block)
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

var girl;
var drawCharacters = function(){
	girl = new createjs.Bitmap("sprites/CharacterPinkGirl.png");
	girl.x = 0;
	girl.y = 50;
	stage.addChild(girl)
}

var init = function(){
	drawMap();
	drawCharacters();
};




createjs.Ticker.addEventListener("tick", handleTick);
 function handleTick(event) {
     girl.y += 5;
     if(girl.y > 150) girl.y = 150
     stage.update();
 }

init();