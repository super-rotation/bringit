var win = Titanium.UI.currentWindow;

var tableView = Titanium.UI.createTableView();

var checklists = [{name: '実家'}, {name:'スノーボード'}, {name:'聖地巡礼'}];
for (var i=0; i<checklists.length; i++) {
	var checklist = checklists[i];
	var row = Titanium.UI.createTableViewRow();
	row.add(Titanium.UI.createLabel({
		text: checklist.name,
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

win.add(tableView);