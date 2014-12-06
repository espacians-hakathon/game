function getBlockFactory(image_type) {
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
function Block (type,x,y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.setSprite(type);
}
Block.prototype.setType = function(type) {
    this.type = type;
    setSprite(type);
};
Block.prototype.setSprite = function(type) {
    this.sprite = getBlockFactory(type);
    this.sprite.x = this.x;
    this.sprite.y = this.x;
};
Block.prototype.getSprite = function() {
    return this.sprite;
};