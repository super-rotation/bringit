function ItemListWindow(category_id, name, destination_id) {
	var self = Titanium.UI.createWindow({
			category_id: category_id,
			title: name
	});
	var tableView = Titanium.UI.createTableView({editable: true});

	Ti.API.debug('------------ ItemListWindow ------------');
	var db = require('database');

	var refresh = function() {
		tableView.data = null;
		var items = db.selectAllItem();
		var itemMap = {};
		for (var i=0; i<items.length; i++) {
			itemMap[items[i].item_id] = items[i];
		}
		Ti.API.debug(items);
		Ti.API.debug(itemMap);
		var categoryItems = db.selectCategoryItemById(category_id);
		Ti.API.debug('category_id: ' + category_id);
		Ti.API.debug(categoryItems);

		for (var i=0; i<categoryItems.length; i++) {
			var categoryItem = categoryItems[i];
			var row = Titanium.UI.createTableViewRow();
			row.add(Titanium.UI.createLabel({
				text: itemMap[categoryItem.item_id].name,
				top: 10,
				left: 50,
				width: 300,
				height: 'auto'
			}));
			row.item_id = categoryItem.category_id;
			row.item_id = categoryItem.item_id;
			var checkbox = Titanium.UI.createButton({
				title: '',
				top: 5,
				left: 10,
				width: 30,
				height: 'auto',
				borderColor: '#666',
				borderWidth: 2,
				borderRadius: 15,
				backgroundColor: '#fff',
				backgroundImage: 'none',
				color: '#fff',
				font:{fontSize: 25, fontWeight: 'bold'},
				value: false //value is a custom property in this casehere.
			});
			checkbox.on = function() {
				this.backgroundColor = '#aaa';
				this.value = true;
			};
			checkbox.off = function() {
				this.backgroundColor = '#fff';
				this.value = false;
			};
			if (db.countDestinationItemByIds(destination_id, row.item_id)) {
				checkbox.on();
				Ti.API.debug('checkbox on');
			}
			else {
				checkbox.off();
				Ti.API.debug('checkbox off');
			};
			checkbox.addEventListener('click', function(e) {
				Ti.API.debug('--------- checkbox -----------');
				Ti.API.debug(e);
				if(false == e.source.value){
					e.source.on();
					db.addDestinationItem(destination_id, row.item_id);
				}
				else {
					e.source.off();
					db.deleteDestinationItem(destination_id, row.item_id);
				}
				Titanium.App.fireEvent('updateItemStatus');
			});
			row.add(checkbox);
			tableView.appendRow(row);
		}
	};

	tableView.addEventListener('delete', function(e) {
		db.deleteItem(e.row.category_id, e.row.item_id);
		refresh();
	});

	var addingButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addingButton.addEventListener('click', function () {
		var AddingWindow = require('ui/common/AddingWindow');
		var addingWindow = new AddingWindow('アイテムを追加', 'item', category_id);
		Titanium.App.navGroup.open(addingWindow, {animated: true});
		Titanium.App.addEventListener('addItem', function() {
			Titanium.App.navGroup.close(addingWindow, {animated: true});
		});
	});
	self.rightNavButton = addingButton;


	Titanium.App.addEventListener('addItem', function() {
		refresh();
	});

	self.add(tableView);

	refresh();

	return self;
}

module.exports = ItemListWindow;



