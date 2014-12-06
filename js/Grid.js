var mapMargin = 150;

function Grid (stage) {
    this.blocks = [];
    this.columnsCount = 0;
    this.stage = stage;
}
Grid.prototype.addColumn = function(path) {
	blocks_column =[];
	for (var i = 0;i < path.length; i++) {
		var block = new Block(path[i], this.columnsCount * 100, i * 85 + mapMargin);
		blocks_column.push(block);
		this.stage.addChild(block.getSprite());
	}
	this.blocks.push(blocks_column);
	return ++this.columnsCount;
};
Grid.prototype.setColumn = function(n,path) {
	this.blocks[n - 1] = path;
};
Grid.prototype.getBlock = function(col,row) {
	return this.blocks[col][row];
};
Grid.prototype.setBlock = function(col,row,type) {

	var z = this.stage.getChildIndex(this.getBlock(col,row).getSprite())
	this.stage.removeChild(this.getBlock(col,row).getSprite());
	var block =  this.getBlock(col,row);
	// block.setType(type);
	this.stage.addChild(block.getSprite());
	



// 	var z = this.stage.getChildIndex(this.getBlock(col,row).getSprite())
// 	var that = this;
// 	var block =  this.getBlock(col,row);
// 	var original_y = block.y
// 	// block.setType(type);
// 	// this.stage.addChild(block.getSprite());
// 	// this.stage.setChildIndex(block.getSprite(), z)
	swapSprite(this.getBlock(col,row),type,z);

// 	createjs.Tween.get(block.getSprite()).to({y:-1000}, 500, createjs.Ease.getElasticInOut(1000,1000)).call(function() {

//         that.stage.removeChild(block.sprite);
//         var block =  that.getBlock(col,row);
// 		block.setType(type);
// 		that.stage.addChild(block.getSprite());
// 		that.stage.setChildIndex(block.getSprite(), z)

// 		block.sprite.y = -1000;


// 		createjs.Tween.get(block.getSprite()).to({y:original_y}, 500, createjs.Ease.getElasticInOut(100,5000));
//     });
};