function ChecklistWindow(destination_id, name) {
	var self = Titanium.UI.createWindow({
		destination_id: destination_id,
		title: name
	});

	var tableView = Titanium.UI.createTableView({editable: true});

	var db = require('database');

	var refresh = function() {
		tableView.data = null;
		var checklists = db.selectDestinationItemById(destination_id);
		var items = db.selectAllItem();
		var itemMap = {};
		for (var i=0; i<items.length; i++) {
			itemMap[items[i].item_id] = items[i];
		}

		for (var i=0; i<checklists.length; i++) {
			var checklist = checklists[i];
			var row = Titanium.UI.createTableViewRow();
			var item = itemMap[checklist.item_id];
			row.add(Titanium.UI.createLabel({
				text: item.name,
				top: 10,
				left: 50,
				width: 300,
				height: 'auto'
			}));
			row.destination_id = checklist.destination_id;
			row.item_id = checklist.item_id;
			var memo = '';
			var maxLength = 14;
			if (item.memo.length >= maxLength) {
				Ti.API.debug('-------------- memo length -------------');
				Ti.API.debug('memo length: ' + item.memo.length);
				memo = item.memo.substring(0, maxLength) + '...';
			}
			row.add(Titanium.UI.createLabel({
				text: memo,
				top: 30,
				left: 50,
				width: 300,
				height: 'auto',
				color: 'gray'
			}));
			var top = (item.memo) ? 12 : 3;
			var checkbox = Titanium.UI.createButton({
				title: '',
				top: top,
				left: 10,
				width: 30,
				height: 'auto',
				backgroundImage: 'light_circle.png',
				color: '#fff',
				font:{fontSize: 25, fontWeight: 'bold'},
				value: false //value is a custom property in this casehere.
			});
			checkbox.destination_id = checklist.destination_id;
			checkbox.item_id = checklist.item_id;
			checkbox.on = function(){
				this.backgroundImage = 'dark_check-2.png';
				this.value = true;
			};
			checkbox.off = function(){
				this.backgroundImage = 'light_circle.png';
				this.value = false;
			};
			if (db.getCheckedStatus(checkbox.destination_id, checkbox.item_id)) {
				checkbox.on();
				Ti.API.debug('checkbox on');
			}
			else {
				checkbox.off();
				Ti.API.debug('checkbox off');
			}
			checkbox.addEventListener('click', function(e){
				Ti.API.debug('--------- checkbox -----------');
				Ti.API.debug(e);
				if(false == e.source.value){
					e.source.on();
				}
				else {
					e.source.off();
				}
				db.updateCheckedStatus(e.source.destination_id, e.source.item_id);
			});
			row.add(checkbox);
			tableView.appendRow(row);
		}
	};
	self.add(tableView);

	tableView.addEventListener('delete', function(e) {
		db.deleteDestinationItem(e.row.destination_id, e.row.item_id);
		refresh();
	});

	var addItemButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addItemButton.addEventListener('click', function () {
		var CategoryWindow = require('ui/common/CategoryWindow');
		var categoryWindow = new CategoryWindow(destination_id);
		Titanium.App.navGroup.open(categoryWindow);
	});
	self.rightNavButton = addItemButton;

	Titanium.App.addEventListener('updateItemStatus', function(data) {
		Ti.API.debug('------------ updateItemStatus ------------');
		refresh();
	});

	Titanium.App.addEventListener('deleteItem', function(data) {
		Ti.API.debug('------------ deleteItem ------------');
		refresh();
	});

	refresh();

	return self;
}

module.exports = ChecklistWindow;