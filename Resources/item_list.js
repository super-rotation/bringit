var win = Titanium.UI.currentWindow;

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

var addButton = Ti.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.ADD
});
addButton.addEventListener('click', function () {
	var addWindow = Ti.UI.createWindow({
		url: 'add.js',
		title: 'アイテムを追加',
		backgroundColor: '#fff'
	});
	Titanium.UI.currentTab.open(addWindow);
});
win.rightNavButton = addButton;

tableView.addEventListener('click', function(e) {
	//アイテムが選択された時の処理
});

win.add(tableView);



