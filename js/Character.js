function Character (name,column) {
    this.name = name;
    this.nameText = new createjs.Text(name, "bold 25px answerFont" ,"#000");
    this.column = column;
    this.row = 0;
    this.targetBlock = this.row;
}
Character.prototype.setImage = function(image) {
    console.log("Changing image");
    this.image = image;
};

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