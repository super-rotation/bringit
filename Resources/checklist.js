var win = Titanium.UI.currentWindow;

var tableView = Titanium.UI.createTableView();

var checklists = [{name: 'パンツ'}, {name:'はぶらし'}, {name: 'コンタクトレンズ'}, {name: '充電器'}];
for (var i=0; i<checklists.length; i++) {
	var checklist = checklists[i];
	var row = Titanium.UI.createTableViewRow();
	row.add(Titanium.UI.createLabel({
		text: checklist.name,
		top: 10,
		left: 50,
		width: 300,
		height: 'auto'
	}));
	var checkbox = Titanium.UI.createButton({
		title: '',
		top: 5,
		left: 10,
		width: 30,
		height: 'auto',
		borderColor: '#666',
		borderWidth: 2,
		borderRadius: 15,
		backgroundColor: '#fff',
		backgroundImage: 'none',
		color: '#fff',
		font:{fontSize: 25, fontWeight: 'bold'},
		value: false //value is a custom property in this casehere.
	});
	checkbox.on = function() {
		this.backgroundColor = '#aaa';
		this.value = true;
	};
	checkbox.off = function() {
		this.backgroundColor = '#fff';
		this.value = false;
	};
	checkbox.addEventListener('click', function(e) {
		if(false == e.source.value){
			e.source.on();
		} else {
			e.source.off();
		}
	});
	row.add(checkbox);
	tableView.appendRow(row);
}

var addButton = Ti.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.ADD
});
addButton.addEventListener('click', function () {
	var addWindow = Ti.UI.createWindow({
		url: 'item_category.js',
		title: '追加アイテム選択',
		backgroundColor: '#fff'
	});
	Titanium.UI.currentTab.open(addWindow);
});
win.rightNavButton = addButton;

win.add(tableView);