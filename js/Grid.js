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
	block.setType(type);
	this.stage.addChild(block.getSprite());
	this.stage.setChildIndex(block.getSprite(), z)
// 	swapSprite(this.getBlock(col,row),type);
};