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

var drawTileBlock = function(image_type, x, y) {
    var block = getImageFactory(image_type);
    console.log(block);
    block.x = x * 100;
    block.y = mapMargin + y * 85;
    stage.addChild(block);
};


var drawMap = function() {
    _(map).each(function(row, i) {
        _(row).each(function(tile, j) {
            self.drawTileBlock(tile, i, j); //draw a rectangle at j,i
        });
    });
};

var girl;
var drawCharacters = function() {
    girl = new createjs.Bitmap("sprites/CharacterPinkGirl.png");
    girl.x = 0;
    girl.y = mapMargin + 50;
    stage.addChild(girl);
};

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
    girl.y += 5;
    if (girl.y > mapMargin + 150) girl.y = mapMargin + 150;
    stage.update();

}

init();
