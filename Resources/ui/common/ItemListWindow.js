function ItemListWindow(item_list_id, name) {
	var self = Titanium.UI.createWindow({
			itemListId: item_list_id,
			title: name
	});
	var tableView = Titanium.UI.createTableView();

	var items = [{name: '歯ブラシ'}, {name:'タオル'}, {name: '洗顔フォーム'}, {name: 'コンタクトレンズ'}];
	for (var i=0; i<items.length; i++) {
		var item = items[i];
		var row = Titanium.UI.createTableViewRow();
		row.add(Titanium.UI.createLabel({
			text: item.name,
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



