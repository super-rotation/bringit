function CategoryWindow() {
	var db = require('database');
	var self = Ti.UI.createWindow({
		title: 'アイテム選択',
		backgroundColor: '#fff'
	});
	var tableView = Titanium.UI.createTableView({});

	var categories = [];
	var refresh = function() {
		tableView.data = null;
		categories = db.selectAllCategory();
		tableView.destination_id = Titanium.App.destination_id;
		var destObj = db.selectDestinationById(tableView.destination_id);
		tableView.destination_name = destObj.name;
		self.title = 'アイテム選択';
		for (var i = 0; i < categories.length; i++) {
			var category = categories[i];
			var headerText = i ? null : ('選択中の行き先：' + destObj.name);
			var row = Titanium.UI.createTableViewRow({hasChild: true, header: headerText});
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
		var itemListWindow = new ItemListWindow(category_id, category_name, tableView.destination_name, tableView.destination_id);
		itemListWindow.containingTab = self.containingTab;
		self.containingTab.open(itemListWindow);
	});

	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function () {
		var AddWindow = require('ui/common/AddWindow');
		var addWindow = new AddWindow('カテゴリー', 'category');
		addWindow.containingTab = self.containingTab;
		self.containingTab.open(addWindow, {animated: true});
			Titanium.App.addEventListener('addCategory', function() {
				self.containingTab.close(addWindow, {animated: true});
			});
	});
	self.rightNavButton = addButton;

	Titanium.App.addEventListener('addCategory', function() {
		refresh();
	});
	Titanium.App.addEventListener('selectDestination', function() {
		refresh();
	});

	self.add(tableView);

	refresh();

	return self;
}

module.exports = CategoryWindow;