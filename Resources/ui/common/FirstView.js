//FirstView Component Constructor
function FirstView() {
	var self = Titanium.UI.createTableView({editable: true});

	var db = require('database');
	db.setTable();

	var checkCheckedNum = function (destItems) {
		var checkedNum = 0;
		for (var i = 0; i < destItems.length; i++) {
			if (destItems[i].checked) checkedNum++;
		}
		return checkedNum;
	};

	var refresh = function() {
		self.data = null;
		var destLists = db.selectAllDestination();
		self.dest_lists = destLists;
		for (var i=0; i<destLists.length; i++) {
			var destList = destLists[i];
			var destItems = db.selectDestinationItemById(destList.destination_id);
			var checkedNum = checkCheckedNum(destItems);
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
			var unfinishedNum = destItems.length - checkedNum;
			row.add(Titanium.UI.createLabel({
				text: '完了：' + checkedNum + '　　未完了：' + unfinishedNum,
				top: 30,
				left: 50,
				width: 300,
				height: 'auto',
				color: 'gray',
				font: {fontStyle: 'italic'}
			}));
			if (unfinishedNum === 0　&& checkedNum > 0) {
				row.add(Titanium.UI.createButton({
					title: '',
					top: 12,
					left: 230,
					width: 30,
					height: 'auto',
					backgroundImage: 'dark_check.png',
					font:{fontSize: 25, fontWeight: 'bold'}
				}));
			}
			self.appendRow(row);
		}
	};

	Titanium.App.addEventListener('addDestination', function(data) {
		Ti.API.debug('------------ add destination ------------');
		refresh(self);
	});

	Titanium.App.addEventListener('updateCheckbox', function(data) {
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
