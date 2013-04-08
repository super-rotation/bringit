function CategoryWindow() {
	 var self = Ti.UI.createWindow({
			title: '追加アイテム選択',
			backgroundColor: '#fff'
	});
	var tableView = Titanium.UI.createTableView();

	var db = require('database');

	var refresh = function() {
		tableView.data = null;
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
	};

	tableView.addEventListener('click', function(e) {
		Titanium.App.fireEvent("openItemList", {
			category_id: categories[e.index].category_id,
			name: categories[e.index].name
		});
	});

	Titanium.App.addEventListener('addCategory', function() {
		refresh();
	});

	self.add(tableView);

	refresh();

	return self;
}

module.exports = CategoryWindow;



