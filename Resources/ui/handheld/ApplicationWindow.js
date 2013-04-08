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
		var addingItemButton = Ti.UI.createButton({
			systemButton: Titanium.UI.iPhone.SystemButton.ADD
		});

		addingItemButton.addEventListener('click', function () {
			var CategoryWindow = require('ui/common/CategoryWindow');
			var categoryWindow = new CategoryWindow();
			Titanium.App.addEventListener('openItemList', function(params) {
				var ItemListWindow = require ('ui/common/ItemListWindow');
				var itemListWindow = new ItemListWindow(params.category_id, params.name);
				var addingButton = Ti.UI.createButton({
					systemButton: Titanium.UI.iPhone.SystemButton.ADD
				});
				addingButton.addEventListener('click', function () {
					var AddingWindow = require('ui/common/AddingWindow');
					var addingWindow = new AddingWindow('アイテムを追加', 'item', params.category_id);
					navGroup.open(addingWindow, {animated: true});
					Titanium.App.addEventListener('addItem', function() {
						navGroup.close(addingWindow, {animated: true});
					});
				});
				itemListWindow.rightNavButton = addingButton;
				navGroup.open(itemListWindow);
			});
			var addingButton = Ti.UI.createButton({
				systemButton: Titanium.UI.iPhone.SystemButton.ADD
			});
			addingButton.addEventListener('click', function () {
				var AddingWindow = require('ui/common/AddingWindow');
				var addingWindow = new AddingWindow('カテゴリーを追加', 'category');
					navGroup.open(addingWindow, {animated: true});
					Titanium.App.addEventListener('addCategory', function() {
						navGroup.close(addingWindow, {animated: true});
					});
			});
			categoryWindow.rightNavButton = addingButton;
			navGroup.open(categoryWindow);
		});

		checklistWindow.rightNavButton = addingItemButton;
		Titanium.App.fireEvent('openChecklist');
		navGroup.open(checklistWindow);
	});
	firstViewContainerWindow.add(firstView);

	var addingButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD
	});
	addingButton.addEventListener('click', function () {
		var AddingWindow = require('ui/common/AddingWindow');
		var addingWindow = new AddingWindow('行き先を追加', 'destination');
		navGroup.open(addingWindow, {animated: true});
		Titanium.App.addEventListener('addDestination', function() {
			navGroup.close(addingWindow, {animated: true});
		});
	});
	firstViewContainerWindow.rightNavButton = addingButton;


	var navGroup = Titanium.UI.iPhone.createNavigationGroup({
		window: firstViewContainerWindow
	});
	self.add(navGroup);

	self.tabBarHidden = true;

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
