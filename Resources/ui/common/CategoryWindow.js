function CategoryWindow() {
	 var self = Ti.UI.createWindow({
			title: '追加アイテム選択',
			backgroundColor: '#fff'
	});
	var tableView = Titanium.UI.createTableView();

	var db = require('database');
	var categories = db.selectAllCategory();
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

	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function () {
		var addWindow = Ti.UI.createWindow({
			url: 'add.js',
			title: 'カテゴリーを追加',
			backgroundColor: '#fff'
		});
		Titanium.UI.currentTab.open(addWindow);
	});
	self.rightNavButton = addButton;

	tableView.addEventListener('click', function(e) {
		Titanium.App.fireEvent("openItemList", {
			category_id: categories[e.index].category_id,
			name: categories[e.index].name
		});
	});

	self.add(tableView);

	return self;
}

module.exports = CategoryWindow;



