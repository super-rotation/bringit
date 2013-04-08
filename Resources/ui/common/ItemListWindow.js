function ItemListWindow(category_id, name) {
	var self = Titanium.UI.createWindow({
			category_id: category_id,
			title: name
	});
	var tableView = Titanium.UI.createTableView();

	Ti.API.debug('------------ ItemListWindow ------------');
	var db = require('database');
	var items = db.selectAllItem();
	var itemMap = {};
	for (var i=0; i<items.length; i++) {
		itemMap[items[i].item_id] = items[i];
	}
	Ti.API.debug('itemMap: ' + itemMap);
	var categoryItems = db.selectCategoryItemById(category_id);
	Ti.API.debug('category_id: ' + category_id);
	Ti.API.debug('categoryItems: ' + categoryItems);

	for (var i=0; i<categoryItems.length; i++) {
		var categoryItem = categoryItems[i];
		var row = Titanium.UI.createTableViewRow();
		row.add(Titanium.UI.createLabel({
			text: itemMap[categoryItem.item_id].name,
			top: 10,
			left: 10,
			width: 300,
			height: 'auto'
		}));
		tableView.appendRow(row);
	}

	tableView.addEventListener('click', function(e) {
		//アイテムが選択された時の処理
	});

	self.add(tableView);

	return self;
}

module.exports = ItemListWindow;



