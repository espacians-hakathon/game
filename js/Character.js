function Character (name, column) {
    this.name = name;
    this.nameText = new createjs.Text(name, "bold 15px pixelFont" ,"#000");
    this.column = column;
    this.row = 0;
    this.targetBlock = this.row;
    this.image = new createjs.Bitmap("sprites/CharacterPinkGirl.png");
    this.image.setTransform(column * 100,-50 + mapTopMargin);
    this.nameText.x = this.image.x + this.nameText.getBounds().width / 4;
    this.nameText.y = this.image.y + this.nameText.getBounds().height * 2;
}

Character.prototype.getImage = function() {
    return this.image;
};
Character.prototype.getColumn = function() {
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
    this.row = _targetBlock;
    this.targetBlock = _targetBlock;
};