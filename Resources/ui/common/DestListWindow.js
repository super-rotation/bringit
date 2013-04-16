//FirstView Component Constructor
function DestListWindow() {
	var self = Titanium.UI.createWindow({
		title: '行き先'
	});
	var tableView = Titanium.UI.createTableView({editable: true});

	var conf = require('ui/common/conf');
	var db = require('database');
	db.setTable();

	var checkCheckedNum = function(destItems) {
		var checkedNum = 0;
		for (var i = 0; i < destItems.length; i++) {
			if (destItems[i].checked) checkedNum++;
		}
		return checkedNum;
	};

	var refresh = function() {
		tableView.data = null;
		var destLists = db.selectAllDestination();
		tableView.dest_lists = destLists;
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
				backgroundImage: 'image/dark_' + conf.iconMap[destList.icon_id] + '.png',
				font:{fontSize: 25, fontWeight: 'bold'}
			}));
			if (unfinishedNum === 0　&& checkedNum > 0) {
				row.add(Titanium.UI.createButton({
					title: '',
					top: 12,
					left: 230,
					width: 30,
					height: 'auto',
					backgroundImage: 'image/dark_check.png',
					font:{fontSize: 25, fontWeight: 'bold'}
				}));
			}
			tableView.appendRow(row);
		}
	};

	tableView.addEventListener('click', function(e) {
		var ChecklistWindow = require('ui/common/ChecklistWindow');
		var list = tableView.dest_lists[e.index];
		var checklistWindow = new ChecklistWindow(list.destination_id, list.name);
		Titanium.App.destination_id = list.destination_id;
		Titanium.App.fireEvent('selectDestination');
		checklistWindow.containingTab = self.containingTab;
		self.containingTab.open(checklistWindow);
	});

	Titanium.App.addEventListener('addDestination', function(data) {
		refresh(tableView);
	});

	Titanium.App.addEventListener('updateCheckbox', function(data) {
		refresh(tableView);
	});

	tableView.addEventListener('delete', function(e) {
		db.deleteDestination(e.row.destination_id);
		refresh(tableView);
	});

	self.add(tableView);

	refresh(tableView);

	return self;
}

module.exports = DestListWindow;
