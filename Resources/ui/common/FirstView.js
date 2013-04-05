//FirstView Component Constructor
function FirstView() {
	var self = Titanium.UI.createTableView({editable: true});

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
			Ti.API.debug('-------------destlist----------------');
			Ti.API.debug(destList);
			row.destination_id = destList.destination_id;
			tableView.appendRow(row);
		}

		test.helloInfo();
	};

	refresh(self);

	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function () {
		var addWindow = Ti.UI.createWindow({
			url: 'add.js',
			title: '行き先を追加',
			backgroundColor: '#fff'
		});
		Titanium.UI.currentTab.open(addWindow);
	});
	win.rightNavButton = addButton;

	win.addEventListener('onload', function(){
		Ti.API.debug('------------- onload ----------------');
	});

	self.addEventListener('click', function(e) {
		var checklistWindow = Titanium.UI.createWindow({
			url: 'checklist.js',
			destination_id: lists[e.index].destination_id,
			title: lists[e.index].name
		});
		Titanium.App.fireEvent('openChecklist');
		Titanium.UI.currentTab.open(checklistWindow);
	});

	Titanium.App.addEventListener('updateDestination', function(data){
		Ti.API.debug('------------ update destination ------------');
		refresh(self);
	});

	self.addEventListener('delete', function(e){
		Ti.API.debug('---------- delete -------------');
		Ti.API.debug(e.rowData);
		Ti.API.debug(e.rowData.destination_id);
		db.deleteDestination(e.row.destination_id);
		refresh(self);
	});

	return self;
}

module.exports = FirstView;
