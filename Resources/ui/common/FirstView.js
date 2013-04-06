//FirstView Component Constructor
function FirstView() {
	var self = Titanium.UI.createTableView({editable: true});

	Titanium.include('database.js');
	var db = new bringitDB();

	var refresh = function() {
		self.data = null;
		var destLists = db.selectAllDestination();
		self.dest_lists = destLists;
		for (var i=0; i<destLists.length; i++) {
			var destList = destLists[i];
			var row = Titanium.UI.createTableViewRow({hasChild: true});
			row.add(Titanium.UI.createLabel({
				text: destList.name,
				top: 10,
				left: 10,
				width: 300,
				height: 'auto'
			}));
			Ti.API.debug('-------------destlist----------------');
			Ti.API.debug(destList);
			row.destination_id = destList.destination_id;
			self.appendRow(row);
		}
	};

	Titanium.App.addEventListener('addDestination', function(data){
		Ti.API.debug('------------ add destination ------------');
		refresh(self);
	});

	self.addEventListener('delete', function(e) {
		Ti.API.debug('---------- delete -------------');
		Ti.API.debug(e.rowData);
		Ti.API.debug(e.rowData.destination_id);
		db.deleteDestination(e.row.destination_id);
		refresh(self);
	});

	refresh(self);

	return self;
}

module.exports = FirstView;
