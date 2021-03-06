function ChecklistWindow(destination_id, name) {
	var self = Titanium.UI.createWindow({
		destination_id: destination_id,
		title: name
	});

	var tableView = Titanium.UI.createTableView({editable: true});

	var db = require('database');
	var util = require('ui/common/util');

	var refresh = function() {
		tableView.data = null;
		var checklists = db.selectDestinationItemById(destination_id);
		var items = db.selectAllItem();
		var itemMap = util.getMap(items, 'item_id');
		var categories = db.selectAllCategory();
		var categoryMap = util.getMap(categories, 'category_id');
		var categoryItems = db.selectAllCategoryItem();
		var categoryItemMap = util.getMap(categoryItems, 'item_id');
		var previous_category_id = null;
		for (var i = 0; i < checklists.length; i++) {
			var checklist = checklists[i];
			var category_id = categoryItemMap[checklist.item_id].category_id;
			var headerText = null;
			if (category_id !== previous_category_id) {
				headerText = categoryMap[category_id].name;
			}
			var row = Titanium.UI.createTableViewRow({header: headerText});
			var item = itemMap[checklist.item_id];
			var label =Titanium.UI.createLabel({
				text: item.name,
				top: 0,
				left: 50,
				width: 300,
				height: 32,
				verticalAlign: 'middle'
			});
			row.add(label);
			row.destination_id = checklist.destination_id;
			row.item_id = checklist.item_id;
			var memo = '';
			var maxLength = 17;
			if (item.memo.length >= maxLength) {
				memo = item.memo.substring(0, maxLength) + '...';
			}
			var grayLabel = Titanium.UI.createLabel({
				text: memo,
				top: 30,
				left: 50,
				width: 300,
				height: 'auto',
				color: 'gray',
				font: {fontStyle: 'italic'}
			});
			row.add(grayLabel);
			var top = (item.memo) ? 14 : 4;
			var checkbox = Titanium.UI.createButton({
				title: '',
				top: top,
				left: 10,
				width: 25,
				height: 25,
				backgroundImage: 'image/light_circle.png',
				color: '#fff',
				font:{fontSize: 25, fontWeight: 'bold'},
				value: false //value is a custom property in this casehere.
			});
			checkbox.destination_id = checklist.destination_id;
			checkbox.item_id = checklist.item_id;
			checkbox.on = function(){
				this.backgroundImage = 'image/dark_check-2.png';
				this.value = true;
				Titanium.App.fireEvent('updateCheckbox');
			};
			checkbox.off = function(){
				this.backgroundImage = 'image/light_circle.png';
				this.value = false;
				Titanium.App.fireEvent('updateCheckbox');
			};
			if (db.getCheckedStatus(checkbox.destination_id, checkbox.item_id)) {
				checkbox.on();
			}
			else {
				checkbox.off();
			}
			checkbox.addEventListener('click', function(e){
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
			previous_category_id = category_id;
		}
	};
	self.add(tableView);

	tableView.addEventListener('delete', function(e) {
		db.deleteDestinationItem(e.row.destination_id, e.row.item_id);
		refresh();
	});

	Titanium.App.addEventListener('updateItemStatus', function(data) {
		refresh();
	});

	Titanium.App.addEventListener('deleteItem', function(data) {
		refresh();
	});

	refresh();

	return self;
}

module.exports = ChecklistWindow;