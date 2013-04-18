function ItemListWindow(category_id, category_name, destination_name, destination_id) {
	var self = Titanium.UI.createWindow({
			category_id: category_id,
			title: category_name
	});
	var tableView = Titanium.UI.createTableView({editable: true});

	var db = require('database');
	var util = require('ui/common/util');

	var refresh = function() {
		tableView.data = null;
		var items = db.selectAllItem();
		var itemMap = util.getMap(items, 'item_id');
		var categoryItems = db.selectCategoryItemById(category_id);

		for (var i = 0; i < categoryItems.length; i++) {
			var categoryItem = categoryItems[i];
			var item = itemMap[categoryItem.item_id];
			var headerText = i ? null : ('選択中の行き先：' + destination_name);
			var row = Titanium.UI.createTableViewRow({item_id: categoryItem.item_id, header: headerText});
			row.add(Titanium.UI.createLabel({
				text: item.name,
				top: 5,
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
				item_id: categoryItem.item_id,
				bubbleParent: false
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
			row.checkbox = checkbox;
			row.add(checkbox);
			var infoButton = Titanium.UI.createButton({
				style: Titanium.UI.iPhone.SystemButton.INFO_DARK,
				right: 15,
				bubbleParent: false,
				name: row.text,
				item_id: categoryItem.item_id,
				bubbleParent: false
			});
			row.add(infoButton);
			infoButton.addEventListener('click', function(e) {
				Ti.API.debug('------ infoButton ------');
				Ti.API.debug(e);
				var EditItemWindow = require('ui/common/EditItemWindow');
				var editItemWindow = new EditItemWindow(e.source.name, destination_id, e.source.item_id);
				editItemWindow.containingTab = self.containingTab;
				self.containingTab.open(editItemWindow, {animated: true});
				Titanium.App.addEventListener('editItem', function() {
					self.containingTab.close(editItemWindow, {animated: true});
				});
			});
			tableView.appendRow(row);
		}
	};

	tableView.addEventListener('delete', function(e) {
		db.deleteItem(e.source.item_id);
		refresh();
		Titanium.App.fireEvent('deleteItem');
	});

	tableView.addEventListener('click', function(e) {
		if(false == e.row.checkbox.value){
			e.row.checkbox.on();
			db.addDestinationItem(destination_id, e.row.checkbox.item_id);
		}
		else {
			e.row.checkbox.off();
			db.deleteDestinationItem(destination_id, e.row.checkbox.item_id);
		}
	}) ;

	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function () {
		var AddWindow = require('ui/common/AddWindow');
		var addWindow = new AddWindow('アイテム', 'item', category_id);
		addWindow.containingTab = self.containingTab;
		self.containingTab.open(addWindow, {animated: true});
		Titanium.App.addEventListener('addItem', function() {
			self.containingTab.close(addWindow, {animated: true});
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
