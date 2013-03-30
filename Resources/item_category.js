var win = Titanium.UI.currentWindow;

var tableView = Titanium.UI.createTableView();

var categories = [{name: '洗面用具'}, {name:'衣類'}, {name: '電化製品'}, {name: 'マイアイテム'}];
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
win.rightNavButton = addButton;

tableView.addEventListener('click', function(e) {
	var itemWindow = Titanium.UI.createWindow({
		url: 'item_list.js',
		itemListId: e.index,
		title: categories[e.index].name
	});
	Titanium.UI.currentTab.open(itemWindow);
});

win.add(tableView);



