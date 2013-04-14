var _dbName = 'bringitdb';
var _initialDestinationId = 10000;
var _initialItemId = 10000;
var _initialCategoryId = 10000;
var _initialItemNum = 133;

exports.open = function(){
	this.db = Titanium.Database.open(_dbName);
};

exports.close = function(){
	this.db.close();
};

exports.getUnixtime = function() {
	return parseInt((new Date()) /1000);
};

exports.setTable = function() {
	this.open();
	// this.db.execute('DROP TABLE destination');
	// this.db.execute('DROP TABLE destination_item');
	// this.db.execute('DROP TABLE item');
	// this.db.execute('DROP TABLE category');
	// this.db.execute('DROP TABLE category_item');
	this.db.execute(
		'CREATE TABLE IF NOT EXISTS destination ('
		+ 'destination_id INTEGER PRIMARY KEY AUTOINCREMENT,'
		+ 'icon_id INTEGER NOT NULL,'
		+ 'name TEXT, created_at INTEGER NOT NULL,'
		+ 'updated_at INTEGER NOT NULL)'
	);
	this.close();
	this.insertInitialDestination();

	this.open();
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
	this.db.execute(
		'CREATE TABLE IF NOT EXISTS item ('
		+ 'item_id INTEGER PRIMARY KEY AUTOINCREMENT,'
		+ 'name TEXT,'
		+ 'memo TEXT)'
	);
	this.close();
	this.insertInitialItem();

	this.open();
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
	if (rows.field(0)) {
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO destination (destination_id, icon_id, name, created_at, updated_at)'
		+ ' VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)',
		_initialDestinationId    , 10002, '実家（サンプル）', now, now,
		_initialDestinationId + 1, 10004, 'キャンプ（サンプル）', now, now,
		_initialDestinationId + 2, 10007, '聖地巡礼（サンプル）', now, now
	);
	this.close();
	return true;
};

exports.insertInitialDestinationItem = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM destination_item');
	if (rows.field(0)) {
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
	this.close();
	return true;
};

exports.insertInitialItem = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM item');
	if (rows.field(0)) {
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var questions = '(?, ?, ?)';
	for (var i = 0; i < _initialItemNum; i++) {
		questions += ', (?, ?, ?)';
	}
	var res = this.db.execute(
		'INSERT INTO item (item_id, name, memo)'
		+ ' VALUES ' + questions,
		_initialItemId    , '現金', '',
		_initialItemId + 1, '財布', '',
		_initialItemId + 2, 'クレジットカード', '',
		_initialItemId + 3, 'キャッシュカード', '',
		_initialItemId + 4, '運転免許書', '',
		_initialItemId + 5, '健康保険証', '',
		_initialItemId + 6, '海外旅行保険証', '',
		_initialItemId + 7, 'パスポート', '',
		_initialItemId + 8, '航空券', '',
		_initialItemId + 9, 'チケット', '',
		_initialItemId + 10, 'トラベラーズチェック', '',
		_initialItemId + 100, 'iPhone', '',
		_initialItemId + 101, 'ケータイ', '',
		_initialItemId + 102, 'iPad', '',
		_initialItemId + 103, 'タブレット', '',
		_initialItemId + 104, 'PC', '',
		_initialItemId + 105, 'iPhone充電器', '',
		_initialItemId + 106, 'ケータイ充電器', '',
		_initialItemId + 107, 'iPad充電器', '',
		_initialItemId + 108, 'タブレット充電器', '',
		_initialItemId + 109, 'PC充電器', '',
		_initialItemId + 110, 'バッテリー', '',
		_initialItemId + 111, '変圧器', '',
		_initialItemId + 112, 'アダプター', '',
		_initialItemId + 113, 'イヤホン', '',
		_initialItemId + 114, 'カメラ', '',
		_initialItemId + 115, 'レンズ', '',
		_initialItemId + 116, 'フラッシュ・ストロボ', '',
		_initialItemId + 117, '三脚', '',
		_initialItemId + 200, '化粧品', '',
		_initialItemId + 201, '洗顔フォーム', '',
		_initialItemId + 202, 'コンタクトレンズ', '',
		_initialItemId + 203, 'コンタクトの保存液', '',
		_initialItemId + 204, 'コンタクトのケース', '',
		_initialItemId + 205, '歯ブラシ', '',
		_initialItemId + 206, '歯みがき粉', '',
		_initialItemId + 207, 'デンタルフロス', '',
		_initialItemId + 208, '鏡', '',
		_initialItemId + 209, 'シャンプー', '',
		_initialItemId + 210, 'コンディショナー', '',
		_initialItemId + 211, 'ヘアバンド', '',
		_initialItemId + 212, 'くし', '',
		_initialItemId + 213, 'カーラー', '',
		_initialItemId + 214, 'ドライヤー', '',
		_initialItemId + 215, 'ヘアジェル', '',
		_initialItemId + 216, 'ヘアスプレー', '',
		_initialItemId + 217, 'ヘアワックス', '',
		_initialItemId + 218, 'クリーム', '',
		_initialItemId + 219, 'リップクリーム', '',
		_initialItemId + 220, '髭剃り', '',
		_initialItemId + 221, '爪切り', '',
		_initialItemId + 222, 'タオル', '',
		_initialItemId + 223, 'ティッシュ', '',
		_initialItemId + 224, '綿棒', '',
		_initialItemId + 225, 'デオドラント', '',
		_initialItemId + 226, '日焼け止め', '',
		_initialItemId + 300, 'ジャケット', '',
		_initialItemId + 301, 'パーカー', '',
		_initialItemId + 302, 'トレーナー', '',
		_initialItemId + 303, 'シャツ', '',
		_initialItemId + 304, 'Tシャツ', '',
		_initialItemId + 305, 'ズボン', '',
		_initialItemId + 306, 'スーツ', '',
		_initialItemId + 307, 'ドレス', '',
		_initialItemId + 308, 'ワンピース', '',
		_initialItemId + 309, 'ブラウス', '',
		_initialItemId + 310, '運動着', '',
		_initialItemId + 311, 'パジャマ', '',
		_initialItemId + 312, '下着', '',
		_initialItemId + 313, '靴下', '',
		_initialItemId + 314, '帽子', '',
		_initialItemId + 315, 'ネクタイ', '',
		_initialItemId + 316, 'ベルト', '',
		_initialItemId + 317, 'コート', '',
		_initialItemId + 318, 'マフラー', '',
		_initialItemId + 319, 'スカーフ', '',
		_initialItemId + 320, 'メガネ', '',
		_initialItemId + 321, 'サングラス', '',
		_initialItemId + 322, 'メガネケース', '',
		_initialItemId + 323, 'ピアス', '',
		_initialItemId + 324, 'イヤリング', '',
		_initialItemId + 325, '腕時計', '',
		_initialItemId + 326, '手袋', '',
		_initialItemId + 327, '靴', '',
		_initialItemId + 328, 'ハイヒール', '',
		_initialItemId + 329, 'サンダル', '',
		_initialItemId + 330, 'スリッパ', '',
		_initialItemId + 331, 'レインコート', '',
		_initialItemId + 332, '傘', '',
		_initialItemId + 400, 'ノート', '',
		_initialItemId + 401, 'メモ帳', '',
		_initialItemId + 402, 'ボールペン', '',
		_initialItemId + 403, 'シャープペン', '',
		_initialItemId + 404, 'バインダー', '',
		_initialItemId + 405, '名刺', '',
		_initialItemId + 500, '常備薬', '',
		_initialItemId + 501, '吐き気止め', '',
		_initialItemId + 502, '胃腸薬', '',
		_initialItemId + 503, '風邪薬', '',
		_initialItemId + 504, '虫さされ薬', '',
		_initialItemId + 505, '目薬', '',
		_initialItemId + 506, 'ばんそうこう', '',
		_initialItemId + 507, 'マスク', '',
		_initialItemId + 600, 'テント', '',
		_initialItemId + 601, '折りたたみ椅子', '',
		_initialItemId + 602, '折りたたみ机', '',
		_initialItemId + 603, 'レジャーシート', '',
		_initialItemId + 604, '寝袋', '',
		_initialItemId + 605, '発火具', '',
		_initialItemId + 606, '懐中電灯', '',
		_initialItemId + 607, 'ランタン', '',
		_initialItemId + 608, '虫除け', '',
		_initialItemId + 700, 'フリスビー', '',
		_initialItemId + 701, 'スノーボード', '',
		_initialItemId + 702, 'スノーボードブーツ', '',
		_initialItemId + 703, 'スノーボードウェア', '',
		_initialItemId + 704, 'ゴーグル', '',
		_initialItemId + 705, 'スキー', '',
		_initialItemId + 706, 'スキーストック', '',
		_initialItemId + 707, 'スキーブーツ', '',
		_initialItemId + 708, 'スキーウェア', '',
		_initialItemId + 709, 'サッカーボール', '',
		_initialItemId + 710, 'サッカーシューズ', '',
		_initialItemId + 711, 'ユニフォーム', '',
		_initialItemId + 712, 'ゴルフボール', '',
		_initialItemId + 713, 'ゴルフクラブ', '',
		_initialItemId + 714, 'ゴルフシューズ', '',
		_initialItemId + 715, 'ゴルフティー', '',
		_initialItemId + 716, 'ゴルフグローブ', '',
		_initialItemId + 717, '水着', '',
		_initialItemId + 800, '本', '',
		_initialItemId + 801, '飲み物', '',
		_initialItemId + 802, '食べ物', '',
		_initialItemId + 803, 'ビニール', ''
	);
	this.close();
	return true;
};

exports.insertInitialCategory = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM category');
	if (rows.field(0)) {
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO category (category_id, name, created_at, updated_at)'
		+ ' VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), '
		+ '(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
		_initialCategoryId    , '貴重品', now, now,
		_initialCategoryId + 1, '電化製品', now, now,
		_initialCategoryId + 2, '化粧品・洗面用具', now, now,
		_initialCategoryId + 3, '衣類・アクセサリー', now, now,
		_initialCategoryId + 4, '文房具', now, now,
		_initialCategoryId + 5, '薬・医療品', now, now,
		_initialCategoryId + 6, 'アウトドア', now, now,
		_initialCategoryId + 7, 'スポーツ用品', now, now,
		_initialCategoryId + 8, 'その他', now, now
	);
	this.close();
	return true;
};

exports.insertInitialCategoryItem = function() {
	this.open();
	var rows = this.db.execute('SELECT COUNT(*) FROM category_item');
	if (rows.field(0)) {
		this.close();
		return true;
	}
	var now = this.getUnixtime();
	var questions = '(?, ?, ?, ?)';
	for (var i = 0; i < _initialItemNum; i++) {
		questions += ', (?, ?, ?, ?)';
	}
	this.db.execute(
		'INSERT INTO category_item (category_id, item_id, created_at, updated_at)'
		+ ' VALUES ' + questions,
		_initialCategoryId    , _initialItemId    , now, now,
		_initialCategoryId    , _initialItemId + 1, now, now,
		_initialCategoryId    , _initialItemId + 2, now, now,
		_initialCategoryId    , _initialItemId + 3, now, now,
		_initialCategoryId    , _initialItemId + 4, now, now,
		_initialCategoryId    , _initialItemId + 5, now, now,
		_initialCategoryId    , _initialItemId + 6, now, now,
		_initialCategoryId    , _initialItemId + 7, now, now,
		_initialCategoryId    , _initialItemId + 8, now, now,
		_initialCategoryId    , _initialItemId + 9, now, now,
		_initialCategoryId    , _initialItemId + 10, now, now,
		_initialCategoryId + 1, _initialItemId + 100, now, now,
		_initialCategoryId + 1, _initialItemId + 101, now, now,
		_initialCategoryId + 1, _initialItemId + 102, now, now,
		_initialCategoryId + 1, _initialItemId + 103, now, now,
		_initialCategoryId + 1, _initialItemId + 104, now, now,
		_initialCategoryId + 1, _initialItemId + 105, now, now,
		_initialCategoryId + 1, _initialItemId + 106, now, now,
		_initialCategoryId + 1, _initialItemId + 107, now, now,
		_initialCategoryId + 1, _initialItemId + 108, now, now,
		_initialCategoryId + 1, _initialItemId + 109, now, now,
		_initialCategoryId + 1, _initialItemId + 110, now, now,
		_initialCategoryId + 1, _initialItemId + 111, now, now,
		_initialCategoryId + 1, _initialItemId + 112, now, now,
		_initialCategoryId + 1, _initialItemId + 113, now, now,
		_initialCategoryId + 1, _initialItemId + 114, now, now,
		_initialCategoryId + 1, _initialItemId + 115, now, now,
		_initialCategoryId + 1, _initialItemId + 116, now, now,
		_initialCategoryId + 1, _initialItemId + 117, now, now,
		_initialCategoryId + 2, _initialItemId + 200, now, now,
		_initialCategoryId + 2, _initialItemId + 201, now, now,
		_initialCategoryId + 2, _initialItemId + 202, now, now,
		_initialCategoryId + 2, _initialItemId + 203, now, now,
		_initialCategoryId + 2, _initialItemId + 204, now, now,
		_initialCategoryId + 2, _initialItemId + 205, now, now,
		_initialCategoryId + 2, _initialItemId + 206, now, now,
		_initialCategoryId + 2, _initialItemId + 207, now, now,
		_initialCategoryId + 2, _initialItemId + 208, now, now,
		_initialCategoryId + 2, _initialItemId + 209, now, now,
		_initialCategoryId + 2, _initialItemId + 210, now, now,
		_initialCategoryId + 2, _initialItemId + 211, now, now,
		_initialCategoryId + 2, _initialItemId + 212, now, now,
		_initialCategoryId + 2, _initialItemId + 213, now, now,
		_initialCategoryId + 2, _initialItemId + 214, now, now,
		_initialCategoryId + 2, _initialItemId + 215, now, now,
		_initialCategoryId + 2, _initialItemId + 216, now, now,
		_initialCategoryId + 2, _initialItemId + 217, now, now,
		_initialCategoryId + 2, _initialItemId + 218, now, now,
		_initialCategoryId + 2, _initialItemId + 219, now, now,
		_initialCategoryId + 2, _initialItemId + 220, now, now,
		_initialCategoryId + 2, _initialItemId + 221, now, now,
		_initialCategoryId + 2, _initialItemId + 222, now, now,
		_initialCategoryId + 2, _initialItemId + 223, now, now,
		_initialCategoryId + 2, _initialItemId + 224, now, now,
		_initialCategoryId + 2, _initialItemId + 225, now, now,
		_initialCategoryId + 2, _initialItemId + 226, now, now,
		_initialCategoryId + 3, _initialItemId + 300, now, now,
		_initialCategoryId + 3, _initialItemId + 301, now, now,
		_initialCategoryId + 3, _initialItemId + 302, now, now,
		_initialCategoryId + 3, _initialItemId + 303, now, now,
		_initialCategoryId + 3, _initialItemId + 304, now, now,
		_initialCategoryId + 3, _initialItemId + 305, now, now,
		_initialCategoryId + 3, _initialItemId + 306, now, now,
		_initialCategoryId + 3, _initialItemId + 307, now, now,
		_initialCategoryId + 3, _initialItemId + 308, now, now,
		_initialCategoryId + 3, _initialItemId + 309, now, now,
		_initialCategoryId + 3, _initialItemId + 310, now, now,
		_initialCategoryId + 3, _initialItemId + 311, now, now,
		_initialCategoryId + 3, _initialItemId + 312, now, now,
		_initialCategoryId + 3, _initialItemId + 313, now, now,
		_initialCategoryId + 3, _initialItemId + 314, now, now,
		_initialCategoryId + 3, _initialItemId + 315, now, now,
		_initialCategoryId + 3, _initialItemId + 316, now, now,
		_initialCategoryId + 3, _initialItemId + 317, now, now,
		_initialCategoryId + 3, _initialItemId + 318, now, now,
		_initialCategoryId + 3, _initialItemId + 319, now, now,
		_initialCategoryId + 3, _initialItemId + 320, now, now,
		_initialCategoryId + 3, _initialItemId + 321, now, now,
		_initialCategoryId + 3, _initialItemId + 322, now, now,
		_initialCategoryId + 3, _initialItemId + 323, now, now,
		_initialCategoryId + 3, _initialItemId + 324, now, now,
		_initialCategoryId + 3, _initialItemId + 325, now, now,
		_initialCategoryId + 3, _initialItemId + 326, now, now,
		_initialCategoryId + 3, _initialItemId + 327, now, now,
		_initialCategoryId + 3, _initialItemId + 328, now, now,
		_initialCategoryId + 3, _initialItemId + 329, now, now,
		_initialCategoryId + 3, _initialItemId + 330, now, now,
		_initialCategoryId + 3, _initialItemId + 331, now, now,
		_initialCategoryId + 3, _initialItemId + 332, now, now,
		_initialCategoryId + 4, _initialItemId + 400, now, now,
		_initialCategoryId + 4, _initialItemId + 401, now, now,
		_initialCategoryId + 4, _initialItemId + 402, now, now,
		_initialCategoryId + 4, _initialItemId + 403, now, now,
		_initialCategoryId + 4, _initialItemId + 404, now, now,
		_initialCategoryId + 4, _initialItemId + 405, now, now,
		_initialCategoryId + 5, _initialItemId + 500, now, now,
		_initialCategoryId + 5, _initialItemId + 501, now, now,
		_initialCategoryId + 5, _initialItemId + 502, now, now,
		_initialCategoryId + 5, _initialItemId + 503, now, now,
		_initialCategoryId + 5, _initialItemId + 504, now, now,
		_initialCategoryId + 5, _initialItemId + 505, now, now,
		_initialCategoryId + 5, _initialItemId + 506, now, now,
		_initialCategoryId + 5, _initialItemId + 507, now, now,
		_initialCategoryId + 6, _initialItemId + 600, now, now,
		_initialCategoryId + 6, _initialItemId + 601, now, now,
		_initialCategoryId + 6, _initialItemId + 602, now, now,
		_initialCategoryId + 6, _initialItemId + 603, now, now,
		_initialCategoryId + 6, _initialItemId + 604, now, now,
		_initialCategoryId + 6, _initialItemId + 605, now, now,
		_initialCategoryId + 6, _initialItemId + 606, now, now,
		_initialCategoryId + 6, _initialItemId + 607, now, now,
		_initialCategoryId + 7, _initialItemId + 700, now, now,
		_initialCategoryId + 7, _initialItemId + 701, now, now,
		_initialCategoryId + 6, _initialItemId + 608, now, now,
		_initialCategoryId + 7, _initialItemId + 702, now, now,
		_initialCategoryId + 7, _initialItemId + 703, now, now,
		_initialCategoryId + 7, _initialItemId + 704, now, now,
		_initialCategoryId + 7, _initialItemId + 705, now, now,
		_initialCategoryId + 7, _initialItemId + 706, now, now,
		_initialCategoryId + 7, _initialItemId + 707, now, now,
		_initialCategoryId + 7, _initialItemId + 708, now, now,
		_initialCategoryId + 7, _initialItemId + 709, now, now,
		_initialCategoryId + 7, _initialItemId + 710, now, now,
		_initialCategoryId + 7, _initialItemId + 711, now, now,
		_initialCategoryId + 7, _initialItemId + 712, now, now,
		_initialCategoryId + 7, _initialItemId + 713, now, now,
		_initialCategoryId + 7, _initialItemId + 714, now, now,
		_initialCategoryId + 7, _initialItemId + 715, now, now,
		_initialCategoryId + 7, _initialItemId + 716, now, now,
		_initialCategoryId + 7, _initialItemId + 717, now, now,
		_initialCategoryId + 8, _initialItemId + 800, now, now,
		_initialCategoryId + 8, _initialItemId + 801, now, now,
		_initialCategoryId + 8, _initialItemId + 802, now, now,
		_initialCategoryId + 8, _initialItemId + 803, now, now
	);
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
		destObj.icon_id = rows.fieldByName('icon_id');
		destObj.name = rows.fieldByName('name');
		destObj.created_at = rows.fieldByName('created_at');
		destObj.updated_at = rows.fieldByName('updated_at');
		res.push(destObj);
		rows.next();
	}
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
		destItemObj.created_at = rows.fieldByName('created_at');
		destItemObj.updated_at = rows.fieldByName('updated_at');
		res.push(destItemObj);
		rows.next();
	}
	return res;
};

exports.selectAllDestinationItem = function(){
	this.open();
	var rows = this.db.execute('SELECT * FROM destination_item ORDER BY created_at');
	var res = this.setDestItemObj(rows);
	rows.close();
	this.close();
	return res;
};

exports.selectDestinationItemById = function(destination_id) {
	this.open();
	var rows = this.db.execute('SELECT * FROM destination_item WHERE destination_id = ? ORDER BY created_at', destination_id);
	var res = this.setDestItemObj(rows);
	rows.close();
	this.close();
	return res;
};

exports.countDestinationItemByIds = function(destination_id, item_id) {
	this.open();
	var rows = this.db.execute(
		'SELECT COUNT(*) FROM destination_item WHERE destination_id = ? and item_id = ?',
		destination_id, item_id
	);
	var count = rows.field(0);
	this.close();
	return count;
};

exports.setItemObj = function(rows) {
	var res = [];
	while (rows.isValidRow()) {
		var itemObj = {};
		itemObj.item_id = rows.fieldByName('item_id');
		itemObj.name = rows.fieldByName('name');
		itemObj.memo = rows.fieldByName('memo');
		res.push(itemObj);
		rows.next();
	}
	return res;
};

exports.selectAllItem = function () {
	this.open();
	var rows = this.db.execute('SELECT * FROM item');
	var res = this.setItemObj(rows);
	rows.close();
	this.close();
	return res;
};

exports.selectItemById = function(item_id) {
	this.open();
	var rows = this.db.execute('SELECT * FROM item WHERE item_id = ?', item_id);
	var res = this.setItemObj(rows);
	rows.close();
	this.close();
	return res[0];
};

exports.updateItemById = function(name, memo, item_id) {
	this.open();
	var res = this.db.execute(
		'UPDATE item SET name = ?, memo = ? WHERE item_id = ?',
		name, memo, item_id
	);
	this.close();
	return true;
};

exports.selectAllCategory = function() {
	this.open();
	var rows = this.db.execute('SELECT * FROM category');
	var res = [];
	while (rows.isValidRow()) {
		var categoryObj = {};
		categoryObj.category_id = rows.fieldByName('category_id');
		categoryObj.name = rows.fieldByName('name');
		categoryObj.created_at = rows.fieldByName('created_at');
		categoryObj.updated_at = rows.fieldByName('updated_at');
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
		categoryItemObj.created_at = rows.fieldByName('created_at');
		categoryItemObj.updated_at = rows.fieldByName('updated_at');
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
	var res = this.db.execute(
		'UPDATE destination_item set checked = ?, updated_at = ? WHERE destination_id = ? and item_id = ?',
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
	this.close();
	return true;
};

exports.addCategory = function(name) {
	this.open();
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO category (name, created_at, updated_at) VALUES (?, ?, ?)',
		name, now, now
	);
	this.close();
	return true;
};

exports.addItem = function(item_name, category_id) {
	this.open();
	this.db.execute('begin transaction');
	this.db.execute(
		'INSERT INTO item (name) VALUES (?)', item_name
	);
	var rows = this.db.execute(
		'SELECT MAX(item_id) FROM item'
	);
	var item_id = rows.field(0);
	var now = this.getUnixtime();
	this.db.execute(
		'INSERT INTO category_item (category_id, item_id, updated_at, created_at) VALUES (?, ?, ?, ?)',
		category_id, item_id, now, now
	);
	this.db.execute('commit');
	this.close();
	return true;
};

exports.addDestinationItem = function(destination_id, item_id) {
	this.open();
	var now = this.getUnixtime();
	var res = this.db.execute(
		'INSERT INTO destination_item (destination_id, item_id, checked, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
		destination_id, item_id , 0, now, now
	);
	this.close();
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
	this.close();
	return true;
};

exports.deleteDestinationItem = function(destination_id, item_id) {
	this.open();
	this.db.execute('begin transaction');
	this.db.execute(
		'DELETE FROM destination_item WHERE destination_id = ? AND item_id = ?',
		destination_id, item_id
	);
	this.db.execute('commit');
	this.close();
	return true;
};

exports.deleteItem = function(item_id) {
	this.open();
	this.db.execute('begin transaction');
	this.db.execute(
		'DELETE FROM item WHERE item_id = ?', item_id
	);
	this.db.execute(
		'DELETE FROM category_item WHERE item_id = ?', item_id
	);
	this.db.execute(
		'DELETE FROM destination_item WHERE item_id = ?', item_id
	);
	this.db.execute('commit');
	this.close();
	return true;
};