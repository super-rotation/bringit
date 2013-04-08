var _dbName = 'bringitdb';
var _initialDestinationId = 10000;
var _initialItemId = 10000;
var _initialCategoryId = 10000;

exports.open = function(){
	this.db = Titanium.Database.open(_dbName);
};

exports.close = function(){
	this.db.close();
};

exports.getUnixtime = function(){
	return parseInt((new Date) /1000);
};

exports.setTable = function() {
	this.open();
//	this.db.execute('DROP TABLE destination');
	this.db.execute(
		'CREATE TABLE IF NOT EXISTS destination ('
		+ 'destination_id INTEGER PRIMARY KEY AUTOINCREMENT,'
		+ 'name TEXT, created_at INTEGER NOT NULL,'
		+ 'updated_at INTEGER NOT NULL)'
	);
	this.close();
	this.insertInitialDestination();

	this.open();
	//	this.db.execute('DROP TABLE destination_item');
	this.db.execute(
		'CREATE TABLE IF NOT EXISTS destination_item ('
		+ 'destination_id INTEGER,'
		+ 'item_id INTEGER,'
		+ 'checked INTEGER NOT NULL,'
		+ 'created_at INTEGER NOT NULL,'
		+ 'updated_at INTEGER NOT NULL,'
		+ 'PRIMARY KEY (destination_id, item_id))'
	);
	this.close();
	this.insertInitialDestinationItem();

	this.open();
	//this.db.execute('DROP TABLE item');
	this.db.execute(
		'CREATE TABLE IF NOT EXISTS item ('
		+ 'item_id INTEGER PRIMARY KEY AUTOINCREMENT,'
		+ 'name TEXT,'
		+ 'memo TEXT)'
	);
	this.close();
	this.insertInitialItem();

	this.open();
	//this.db.execute('DROP TABLE category');
	this.db.execute(
		'CREATE TABLE IF NOT EXISTS category ('
		+ 'category_id INTEGER PRIMARY KEY AUTOINCREMENT,'
		+ 'name TEXT,'
		+ 'created_at INTEGER NOT NULL,'
		+ 'updated_at INTEGER NOT NULL)'
	);
	this.close();
	this.insertInitialCategory();

	this.open();
	//this.db.execute('DROP TABLE category_item');
	this.db.execute(
		'CREATE TABLE IF NOT EXISTS category_item ('
		+ 'category_id INTEGER,'
		+ 'item_id INTEGER,'
		+ 'created_at INTEGER NOT NULL,'
		+ 'updated_at INTEGER NOT NULL)'
	);
	this.close();
	this.insertInitialCategoryItem();
};

exports.insertInitialDestination = function(){
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM destination');
	Ti.API.debug('row: ' + rows.field(0));
	if (rows.field(0)) {
		Ti.API.debug('destination table already has records');
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO destination (destination_id, name, created_at, updated_at)'
		+ ' VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
		_initialDestinationId, '実家', now, now,
		_initialDestinationId + 1, 'スノーボード', now, now,
		_initialDestinationId + 2, '聖地巡礼', now, now
	);
	Ti.API.debug('Add to destination');
	this.close();
	return true;
};

exports.insertInitialDestinationItem = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM destination_item');
	Ti.API.debug('row: ' + rows.field(0));
	if (rows.field(0)) {
		Ti.API.debug('destination_item table already has records');
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO destination_item (destination_id, item_id, checked, created_at, updated_at)'
		+ ' VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)',
		_initialDestinationId    , _initialItemId    , 0, now, now,
		_initialDestinationId    , _initialItemId + 1, 0, now, now,
		_initialDestinationId    , _initialItemId + 2, 0, now, now,
		_initialDestinationId + 1, _initialItemId + 3, 0, now, now
	);
	Ti.API.debug('Add to destination_item');
	this.close();
	return true;
};

exports.insertInitialItem = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM item');
	Ti.API.debug('row ' + rows.field(0));
	if (rows.field(0)) {
		Ti.API.debug('item table already has records');
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO item (item_id, name, memo)'
		+ ' VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)',
		_initialItemId    , '歯ブラシ', 'MEMO',
		_initialItemId + 1, 'タオル', 'MEMO',
		_initialItemId + 2, '洗顔フォーム', 'MEMO',
		_initialItemId + 3, 'コンタクトレンズ', 'MEMO'
	);
	Ti.API.debug('Add to item');
	this.close();
	return true;
};

exports.insertInitialCategory = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM category');
	Ti.API.debug('row ' + rows.field(0));
	if (rows.field(0)) {
		Ti.API.debug('category table already has records');
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO category (category_id, name, created_at, updated_at)'
		+ ' VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
		_initialCategoryId    , '洗面用具', now, now,
		_initialCategoryId + 1, '衣類', now, now,
		_initialCategoryId + 2, '電化製品', now, now,
		_initialCategoryId + 3, 'マイアイテム', now, now
	);
	Ti.API.debug('Add to category');
	this.close();
	return true;
};

exports.insertInitialCategoryItem = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM category_item');
	Ti.API.debug('row: ' + rows.field(0));
	if (rows.field(0)) {
		Ti.API.debug('category_item table already has records');
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	this.db.execute(
		'INSERT INTO category_item (category_id, item_id, created_at, updated_at)'
		+ ' VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
		_initialCategoryId    , _initialItemId    , now, now,
		_initialCategoryId    , _initialItemId + 1, now, now,
		_initialCategoryId    , _initialItemId + 2, now, now,
		_initialCategoryId + 1, _initialItemId + 3, now, now
	);
	Ti.API.debug('Add to category_item');
	this.close();
	return true;
};

exports.selectAllDestination = function() {
	this.open();
	var rows = this.db.execute('SELECT * FROM destination ORDER BY created_at');
	var res = [];
	while (rows.isValidRow()) {
		var destObj = {};
		destObj.destination_id = rows.fieldByName('destination_id');
		destObj.name = rows.fieldByName('name');
		var creationDate = new Date(rows.fieldByName('created_at'));
		destObj.created_at = creationDate.toLocaleString();
		var updateDate = new Date(rows.fieldByName('updated_at'));
		destObj.updated_at = updateDate.toLocaleString();
		res.push(destObj);
		rows.next();
	}
	Ti.API.debug('--------------- destObj ------------------------');
	Ti.API.debug('Found: ' + rows.getRowCount());
	Ti.API.debug(res);
	rows.close();
	this.close();
	return res;
};

exports.setDestItemObj = function(rows){
	var res = [];
	while (rows.isValidRow()) {
		var destItemObj = {};
		destItemObj.destination_id = rows.fieldByName('destination_id');
		destItemObj.item_id = rows.fieldByName('item_id');
		destItemObj.checked = rows.fieldByName('checked');
		var creationDate = new Date(rows.fieldByName('created_at'));
		destItemObj.created_at = creationDate.toLocaleString();
		var updateDate = new Date(rows.fieldByName('updated_at'));
		destItemObj.updated_at = updateDate.toLocaleString();
		res.push(destItemObj);
		rows.next();
	}
	return res;
};

exports.selectAllDestinationItem = function(){
	this.open();
	var rows = this.db.execute('SELECT * FROM destination_item ORDER BY created_at');
	var res = this.setDestItemObj(rows);
	Ti.API.debug('--------------- destItemObj ------------------------');
	Ti.API.debug('Found: ' + rows.getRowCount());
	Ti.API.debug(res);
	rows.close();
	this.close();
	return res;
};

exports.selectDestinationItemById = function(destination_id) {
	this.open();
	var rows = this.db.execute('SELECT * FROM destination_item WHERE destination_id = ? ORDER BY created_at', destination_id);
	var res = this.setDestItemObj(rows);
	Ti.API.debug('--------------- destItemObj ------------------------');
	Ti.API.debug('Found: ' + rows.getRowCount());
	Ti.API.debug(res);
	rows.close();
	this.close();
	return res;
};

exports.selectAllItem = function () {
	this.open();
	var rows = this.db.execute('SELECT * FROM item');
	var res = [];
	while (rows.isValidRow()) {
		var itemObj = {};
		itemObj.item_id = rows.fieldByName('item_id');
		itemObj.name = rows.fieldByName('name');
		itemObj.memo = rows.fieldByName('memo');
		res.push(itemObj);
		rows.next();
	}
	rows.close();
	this.close();
	return res;
};

exports.selectAllCategory = function() {
	this.open();
	var rows = this.db.execute('SELECT * FROM category');
	var res = [];
	while (rows.isValidRow()) {
		var categoryObj = {};
		categoryObj.category_id = rows.fieldByName('category_id');
		categoryObj.name = rows.fieldByName('name');
		var creationDate = new Date(rows.fieldByName('created_at'));
		categoryObj.created_at = creationDate.toLocaleString();
		var updateDate = new Date(rows.fieldByName('updated_at'));
		categoryObj.updated_at = updateDate.toLocaleString();
		res.push(categoryObj);
		rows.next();
	}
	rows.close();
	this.close();
	return res;
};

exports.selectCategoryItemById = function(category_id) {
	this.open();
	var rows = this.db.execute('SELECT * FROM category_item WHERE category_id = ? ORDER BY created_at', category_id);
	var res = [];
	while (rows.isValidRow()) {
		var categoryItemObj = {};
		categoryItemObj.category_id = rows.fieldByName('category_id');
		categoryItemObj.item_id = rows.fieldByName('item_id');
		var creationDate = new Date(rows.fieldByName('created_at'));
		categoryItemObj.created_at = creationDate.toLocaleString();
		var updateDate = new Date(rows.fieldByName('updated_at'));
		categoryItemObj.updated_at = updateDate.toLocaleString();
		res.push(categoryItemObj);
		rows.next();
	}
	rows.close();
	this.close();
	return res;
};


exports.getCheckedStatus = function(destination_id, item_id) {
	this.open();
	var rows = this.db.execute('SELECT * FROM destination_item WHERE destination_id = ? and item_id = ?', destination_id, item_id);
	var isChecked = rows.fieldByName('checked');
	this.close();
	return isChecked;
};

exports.updateCheckedStatus = function(destination_id, item_id) {
	var isChecked = this.getCheckedStatus(destination_id, item_id);
	this.open();
	var res = this.db.execute('UPDATE destination_item set checked = ?, updated_at = ? WHERE destination_id = ? and item_id = ?',
	isChecked ? 0 : 1, this.getUnixtime(), destination_id, item_id
	);
	if (res) Ti.API.info('sucess to update checked status');
	this.close();
	return true;
};

exports.addDestination = function(destinationName) {
	this.open();
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO destination (name, created_at, updated_at) VALUES (?, ?, ?)',
		destinationName, now, now
	);
	Ti.API.debug('Add to destination');
	this.close();
	return true;
};

exports.addItem = function(item_name, category_id) {
	//add item into item table
	this.open();
	var res = this.db.execute(
		'INSERT INTO item (name) VALUES (?)', item_name
	);
	Ti.API.debug('----------------Add to item---------------------');
	Ti.API.debug('Add to item');
	Ti.API.debug('res: ' + res);
	this.close();

	//get item_id

	//add to category_item

	return true;
};

exports.deleteDestination = function(destination_id) {
	this.open();
	this.db.execute('begin transaction');
	this.db.execute(
		'DELETE FROM destination where destination_id = ?',
		destination_id
	);
	this.db.execute('commit');
	Ti.API.debug('delete from destination');
	this.close();
	return true;
};
