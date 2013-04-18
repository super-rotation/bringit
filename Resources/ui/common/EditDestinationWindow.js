function EditDestinationWindow(name) {
	var self = Titanium.UI.createWindow({
		title: name,
		backgroundColor: '#fff'
	});

	var view = Titanium.UI.createView();

	return self;
}

module.exports = EditDestinationWindow;