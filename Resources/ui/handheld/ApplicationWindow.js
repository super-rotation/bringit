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

	var addingButton = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addingButton.addEventListener('click', function () {
		var AddingWindow = require('ui/common/AddingWindow');
		var addingWindow = new AddingWindow('行き先を追加', 'destination');
		Titanium.App.navGroup.open(addingWindow, {animated: true});
		Titanium.App.addEventListener('addDestination', function() {
			Titanium.App.navGroup.close(addingWindow, {animated: true});
		});
	});
	firstViewContainerWindow.rightNavButton = addingButton;


	Titanium.App.navGroup = Titanium.UI.iPhone.createNavigationGroup({
		window: firstViewContainerWindow
	});
	self.add(Titanium.App.navGroup);

	self.tabBarHidden = true;

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
