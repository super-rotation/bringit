function ItemListWindow(category_id, name, destination_id) {
	var self = Titanium.UI.createWindow({
			category_id: category_id,
			title: name
	});
	var tableView = Titanium.UI.createTableView({editable: true});

	var db = require('database');

	var refresh = function() {
		tableView.data = null;
		var items = db.selectAllItem();
		var itemMap = {};
		for (var i=0; i<items.length; i++) {
			itemMap[items[i].item_id] = items[i];
		}
		var categoryItems = db.selectCategoryItemById(category_id);

		for (var i=0; i<categoryItems.length; i++) {
			var categoryItem = categoryItems[i];
			var item = itemMap[categoryItem.item_id];
			var row = Titanium.UI.createTableViewRow({item_id: categoryItem.item_id});
			row.add(Titanium.UI.createLabel({
				text: item.name,
				top: 10,
				left: 50,
				width: 300,
				height: 'auto',
				item_id: categoryItem.item_id,
				category_id: categoryItem.category_id
			}));
			var memo = '';
			var maxLength = 17;
			if (item.memo.length >= maxLength) {
				memo = item.memo.substring(0, maxLength) + '...';
			}
			row.add(Titanium.UI.createLabel({
				text: memo,
				top: 30,
				left: 50,
				width: 300,
				height: 'auto',
				color: 'gray',
				font: {fontStyle: 'italic'}
			}));
			var top = (item.memo) ? 12 : 3;
			var checkbox = Titanium.UI.createButton({
				title: '',
				top: top,
				left: 10,
				width: 30,
				height: 'auto',
				backgroundColor: '#fff',
				backgroundImage: 'image/light_case.png',
				color: '#fff',
				font: {fontSize: 25, fontWeight: 'bold'},
				value: false, //value is a custom property in this casehere.
				item_id: categoryItem.item_id
			});
			checkbox.on = function() {
				this.backgroundImage = 'image/dark_case.png';
				this.value = true;
			};
			checkbox.off = function() {
				this.backgroundImage = 'image/light_case.png';
				this.value = false;
			};
			if (db.countDestinationItemByIds(destination_id, checkbox.item_id)) {
				checkbox.on();
			}
			else {
				checkbox.off();
			};
			checkbox.addEventListener('click', function(e) {
				if(false == e.source.value){
					e.source.on();
					db.addDestinationItem(destination_id, e.source.item_id);
				}
				else {
					e.source.off();
					db.deleteDestinationItem(destination_id, e.source.item_id);
				}
				Titanium.App.fireEvent('updateItemStatus');
			});
			row.add(checkbox);
			tableView.appendRow(row);
		}
	};

	tableView.addEventListener('delete', function(e) {
		db.deleteItem(e.source.item_id);
		refresh();
		Titanium.App.fireEvent('deleteItem');
	});

var _checkboxSize = 50;

	tableView.addEventListener('click', function(e) {
		if (e.x > _checkboxSize) {
			var EditWindow = require('ui/common/EditWindow');
			var editWindow = new EditWindow(e.source.text, e.source.item_id);
			Titanium.App.navGroup.open(editWindow, {animated: true});
			Titanium.App.addEventListener('editItem', function() {
				Titanium.App.navGroup.close(editWindow, {animated: true});
			});
		}
	}) ;

	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function () {
		var AddWindow = require('ui/common/AddWindow');
		var addWindow = new AddWindow('アイテムを追加', 'item', category_id);
		Titanium.App.navGroup.open(addWindow, {animated: true});
		Titanium.App.addEventListener('addItem', function() {
			Titanium.App.navGroup.close(addWindow, {animated: true});
		});
	});
	self.rightNavButton = addButton;

	Titanium.App.addEventListener('addItem', function() {
		refresh();
	});
	Titanium.App.addEventListener('editItem', function() {
		refresh();
	});

	self.add(tableView);

	refresh();

	return self;
}

module.exports = ItemListWindow;
