function Grid (stage) {
    this.blocks = [];
    this.columnsCount = 0;
    this.stage = stage;
}
Grid.prototype.addColumn = function(path) {
	blocks_column =[];
	for (var i = 0;i < path.length; i++) {
		var block = new Block(path[i], this.columnsCount * 100 , i * 85 );
		blocks_column.push(block);
		gridContainer.addChild(block.getSprite());
	}
	this.blocks.push(blocks_column);
	return ++this.columnsCount;
};
Grid.prototype.getBlock = function(col,row) {
	return this.blocks[col][row];
};
Grid.prototype.setBlock = function(col,row,type) {
	var z = gridContainer.getChildIndex(this.getBlock(col,row).getSprite());
	var block =  this.getBlock(col,row);


	swapSprite(block, type, z);
};

var swapSprite = function(block, type, z) {
    var originalX = block.sprite.x,
        originalY = block.sprite.y;
    var image = getBlockFactory(type);
    image.x = originalX;
    image.y = originalY;

    createjs.Tween.get(block.sprite).to({
        y: -1000
    }, 500, createjs.Ease.getElasticInOut(1000, 1000)).call(function() {
        console.log("removing");
        stage.removeChild(block.sprite);
        block.sprite = image;
        block.type=type;
        image.y = -1000;
        gridContainer.addChild(block.sprite);
        gridContainer.setChildIndex(block.sprite, z);

        createjs.Tween.get(image).to({
            y: originalY
        }, 500, createjs.Ease.getElasticInOut(100, 5000));
    });
};