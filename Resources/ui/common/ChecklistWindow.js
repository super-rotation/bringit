function ChecklistWindow(destination_id, name) {
	var self = Titanium.UI.createWindow({
		destination_id: destination_id,
		title: name
	});

	var tableView = Titanium.UI.createTableView();

	var db = require('database');

	var refresh = function() {
		tableView.data = null;
		var checklists = db.selectDestinationItemById(destination_id);
		var items = db.selectAllItem();
		var item_map = {};
		for (var i=0; i<items.length; i++) {
			item_map[items[i].item_id] = items[i];
		}

		for (var i=0; i<checklists.length; i++) {
			var checklist = checklists[i];
			var row = Titanium.UI.createTableViewRow();
			row.add(Titanium.UI.createLabel({
				//TODO: change item_id into name after making item table
//				text: checklist.item_id,
				text: item_map[checklist.item_id].name,
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
			checkbox.destination_id = checklist.destination_id;
			checkbox.item_id = checklist.item_id;
			checkbox.on = function(){
				this.backgroundColor = '#aaa';
				this.value = true;
			};
			checkbox.off = function(){
				this.backgroundColor = '#fff';
				this.value = false;
			};
			if (db.getCheckedStatus(checkbox.destination_id, checkbox.item_id)) {
				checkbox.on();
				Ti.API.debug('checkbox on');
			} else {
				checkbox.off();
				Ti.API.debug('checkbox off');
			}
			checkbox.addEventListener('click', function(e){
				Ti.API.debug('--------- checkbox -----------');
				Ti.API.debug(e);
				if(false == e.source.value){
					e.source.on();
				}
				else {
					e.source.off();
				}
				db.updateCheckedStatus(e.source.destination_id, e.source.item_id);
			});
			row.add(checkbox);
			tableView.appendRow(row);
		}
	};
	self.add(tableView);

	Titanium.App.addEventListener('openChecklist', function(data) {
		Ti.API.debug('------------ open checklist ------------');
		refresh();
	});

	refresh();

	return self;
}

module.exports = ChecklistWindow;