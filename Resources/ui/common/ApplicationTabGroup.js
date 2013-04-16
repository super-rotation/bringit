function ApplicationTabGroup() {
	var self = Titanium.UI.createTabGroup();

	Titanium.App.destination_id = 10000;
	var DestListWindow = require('ui/common/DestListWindow');
	var destListWindow = new DestListWindow();
	var CategoryWindow = require('ui/common/CategoryWindow');
	var categoryWindow = new CategoryWindow();
	var configWindow = Titanium.UI.createWindow({
		title: 'config',
		backgroundColor: 'white'
	});

	var destListTab = Titanium.UI.createTab({
		title: '行き先リスト',
		icon: '/image/tab_light_list.png',
		window: destListWindow
	});
	destListWindow.containingTab = destListTab;
	var categoryTab = Ti.UI.createTab({
		title: 'アイテム選択',
		icon: '/image/tab_light_case.png',
		window: categoryWindow
	});
	categoryWindow.containingTab = categoryTab;
	var configTab = Ti.UI.createTab({
		title: '設定',
		icon: '/image/tab_light_gear.png',
		window: configWindow
	});
	configWindow.containingTab = configTab;

	self.addTab(destListTab);
	self.addTab(categoryTab);
	self.addTab(configTab);

	return self;
}

module.exports = ApplicationTabGroup;