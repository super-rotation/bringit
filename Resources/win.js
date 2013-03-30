var win = Titanium.UI.currentWindow;

var tableView = Titanium.UI.createTableView();

var destLists = [{name: '実家'}, {name:'スノーボード'}, {name:'聖地巡礼'}];
for (var i=0; i<destLists.length; i++) {
	var destList = destLists[i];
	var row = Titanium.UI.createTableViewRow();
	row.add(Titanium.UI.createLabel({
		text: destList.name,
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
		url: 'add_destination.js',
		title: '行き先を追加',
		backgroundColor: '#fff'
	});
	Titanium.UI.currentTab.open(addWindow);
});
win.rightNavButton = addButton;

tableView.addEventListener('click', function(e) {
	var checklistWindow = Titanium.UI.createWindow({
		url: 'checklist.js',
		checklist_id: e.index,
		title: destLists[e.index].name
	});
	Titanium.UI.currentTab.open(checklistWindow);
});

win.add(tableView);