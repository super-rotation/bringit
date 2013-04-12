//Application Window Component Constructor
function ApplicationWindow() {
	var self = Titanium.UI.createWindow({
		backgroundColor: '#fff'
	});

	var firstViewContainerWindow = Titanium.UI.createWindow({
		title: '用途'
	});
	var FirstView = require('ui/common/FirstView');
	var firstView = new FirstView();

	firstView.addEventListener('click', function(e) {
		var ChecklistWindow = require('ui/common/ChecklistWindow');
		var list = firstView.dest_lists[e.index];
		var checklistWindow = new ChecklistWindow(list.destination_id, list.name);
		Titanium.App.navGroup.open(checklistWindow);
	});
	firstViewContainerWindow.add(firstView);

	var addButton = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function () {
		var AddWindow = require('ui/common/addWindow');
		var addWindow = new AddWindow('行き先を追加', 'destination');
		Titanium.App.navGroup.open(addWindow, {animated: true});
		Titanium.App.addEventListener('addDestination', function() {
			Titanium.App.navGroup.close(addWindow, {animated: true});
		});
	});
	firstViewContainerWindow.rightNavButton = addButton;


	Titanium.App.navGroup = Titanium.UI.iPhone.createNavigationGroup({
		window: firstViewContainerWindow
	});
	self.add(Titanium.App.navGroup);

	self.tabBarHidden = true;

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
