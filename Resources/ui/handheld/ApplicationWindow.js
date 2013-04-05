//Application Window Component Constructor
function ApplicationWindow() {
	var FirstView = require('ui/common/FirstView');

	var self = Titanium.UI.createWindow({
	title: '用途',
	backgroundColor: '#fff'
	});
	var firstView = new FirstView();
	self.add(firstView);
	self.tabBarHidden = true;

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
