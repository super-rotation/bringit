var bringitDB = function(){
	this.dbName = 'bringitdb';

	this.open = function(){
		this.db = Titanium.Database.open(this.dbName);
	};

	this.close = function(){
		this.db.close();
	};

	this.getUnixtime = function(){
		return parseInt((new Date) /1000);
	};

	this.insertInitialData = function(){
		this.open();
		var rows = this.db.execute('SELECT COUNT(*) FROM destination');
		Ti.API.info('row: ' + rows.field(0));
		if(!rows.field(0)){
			var now = this.getUnixtime();
			var res = this.db.execute(
				'INSERT INTO destination (destination_id, name, created_at, updated_at) VALUES(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
				10000, '実家', now, now,
				10001, 'スノーボード', now, now,
				10002, '聖地巡礼', now, now
			);
			Ti.API.debug('Add to DB');
		}
		this.close();
		return true;
	};

	this.selectAllDestination = function(){
		this.open();
		var rows = this.db.execute('SELECT * FROM destination ORDER BY created_at');
		var res = [];
		while(rows.isValidRow()){
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
		Ti.API.debug('Found: ' + rows.getRowCount());
		Ti.API.info('--------------- destObj ------------------------');
		Ti.API.info(res);
		rows.close();
		this.close();
		return res;
	};

	this.addDestination = function(destinationName){
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

	this.deleteDestination = function(destination_id){
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

	this.open();
//	this.db.execute('DROP TABLE destination');
	this.db.execute('CREATE TABLE IF NOT EXISTS destination (destination_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)');
	this.insertInitialData();
	this.close();
};