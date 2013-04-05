function ApplicationTabGroup(window) {
	var self = Titanium.UI.createTabGroup();
	var win = new window();
	var tab = Titanium.UI.createTab({
		window: win,
		title: 'check list'
	});
	self.addTab(tab);

	return self;
};

module.exports = ApplicationTabGroup;