var win = Titanium.UI.currentWindow;

var tableView = Titanium.UI.createTableView();

Titanium.include('database.js');
var db = new bringitDB();

var lists = [];
var refresh = function(tableView){
	tableView.data = null;
	var destLists = db.selectAllDestination();
	lists = destLists;
	for (var i=0; i<destLists.length; i++) {
		var destList = destLists[i];
		var row = Titanium.UI.createTableViewRow({hasChild: true});
		row.add(Titanium.UI.createLabel({
			text: destList.name,
			top: 10,
			left: 10,
			width: 300,
			height: 'auto'
		}));
		tableView.appendRow(row);
	}
};

refresh(tableView);

var addButton = Ti.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.ADD
});
addButton.addEventListener('click', function () {
	var addWindow = Ti.UI.createWindow({
		url: 'add.js',
		title: '行き先を追加',
		backgroundColor: '#fff'
	});
	addWindow.refresh = refresh;
	addWindow.tableView = tableView;
	Titanium.UI.currentTab.open(addWindow);
});
win.rightNavButton = addButton;

tableView.addEventListener('click', function(e) {
	var checklistWindow = Titanium.UI.createWindow({
		url: 'checklist.js',
		destination_id: lists[e.index].id,
		title: lists[e.index].name
	});
	Titanium.UI.currentTab.open(checklistWindow);
});

win.add(tableView);