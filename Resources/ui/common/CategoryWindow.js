function CategoryWindow(destination_id) {
	 var self = Ti.UI.createWindow({
			title: '追加アイテム選択',
			backgroundColor: '#fff'
	});
	var tableView = Titanium.UI.createTableView();

	var db = require('database');

	var categories = [];
	var refresh = function() {
		tableView.data = null;
		categories = db.selectAllCategory();
		for (var i=0; i<categories.length; i++) {
			var category = categories[i];
			var row = Titanium.UI.createTableViewRow({hasChild: true});
			row.add(Titanium.UI.createLabel({
				text: category.name,
				top: 10,
				left: 10,
				width: 300,
				height: 'auto'
			}));
			tableView.appendRow(row);
		}
	};

	tableView.addEventListener('click', function(e) {
		var category_id = categories[e.index].category_id;
		var category_name = categories[e.index].name;
		var ItemListWindow = require ('ui/common/ItemListWindow');
		var itemListWindow = new ItemListWindow(category_id, category_name, destination_id);
		Titanium.App.navGroup.open(itemListWindow);
	});

	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function () {
		var AddWindow = require('ui/common/AddWindow');
		var addWindow = new AddWindow('カテゴリーを追加', 'category');
			Titanium.App.navGroup.open(addWindow, {animated: true});
			Titanium.App.addEventListener('addCategory', function() {
				Titanium.App.navGroup.close(addWindow, {animated: true});
			});
	});
	self.rightNavButton = addButton;

	Titanium.App.addEventListener('addCategory', function() {
		refresh();
	});

	self.add(tableView);

	refresh();

	return self;
}

module.exports = CategoryWindow;



