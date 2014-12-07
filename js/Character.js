function Character (name, column,img) {
    this.name = name;
    this.nameText = new createjs.Text(name, "bold 17px Arial" ,"#000");
    this.nameTextStroke = new createjs.Text(name, "bold 17px Arial" ,"#FFF");
    this.column = column;
    this.row = 0;
    this.targetBlock = this.row;
    this.image = getImageFactory(img);
    this.image.setTransform(column * 100,-50 );
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

Character.prototype.jump = function() {
    console.log("s")
    var that = this;
    setInterval(function(){
        that.targetBlock = that.targetBlock - 0.1;
        setTimeout(function(){
            that.targetBlock = that.targetBlock + 0.1;
        }, 400);
    }, 1000);
};