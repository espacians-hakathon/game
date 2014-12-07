function getBlockFactory(image_type) {
    switch (image_type) {
        case "g":
            return new createjs.Bitmap("sprites/GreenGrassBlock.png");
        case "s":
            return new createjs.Bitmap("sprites/DirtBlock.png");
        case "b":
            return new createjs.Bitmap("sprites/GrassBlock.png");
        case "end":
            return new createjs.Bitmap("sprites/WallBlock.png");
        default:
            return new createjs.Bitmap("sprites/GrassBlock.png");
    }
}
function Block (type,x,y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.setSprite(type);
}
Block.prototype.setType = function(type) {
    this.type = type;
    this.setSprite(type);
};
Block.prototype.setSprite = function(type) {
    var x = this.x;
    var y = this.y;
    this.sprite = getBlockFactory(type);
    this.sprite.x = x;
    this.sprite.y = y;
};
Block.prototype.getSprite = function() {
    return this.sprite;
};
