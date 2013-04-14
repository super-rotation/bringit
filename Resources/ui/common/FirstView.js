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

	var iconMap = {
		10000: 'airplain',
		10001: 'automobile',
		10002: 'home',
		10003: 'bldg',
		10004: 'flame',
		10005: 'heart',
		10006: 'book',
		10007: 'camera',
		10008: 'cart',
		10009: 'pegman'
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
				left: 50,
				width: 300,
				height: 'auto'
			}));
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
			row.add(Titanium.UI.createButton({
				title: '',
				top: 12,
				left: 10,
				width: 30,
				height: 'auto',
				backgroundImage: 'image/dark_' + iconMap[destList.icon_id] + '.png',
				font:{fontSize: 25, fontWeight: 'bold'}
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
		refresh(self);
	});

	Titanium.App.addEventListener('updateCheckbox', function(data) {
		refresh(self);
	});

	self.addEventListener('delete', function(e) {
		db.deleteDestination(e.row.destination_id);
		refresh(self);
	});

	refresh(self);

	return self;
}

module.exports = FirstView;
