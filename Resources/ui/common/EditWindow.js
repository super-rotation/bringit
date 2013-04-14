function editWindow(name, item_id) {
	var self = Titanium.UI.createWindow({
		title: name,
		backgroundColor: '#fff'
	});

	var view = Titanium.UI.createView();

	var nameLabel = Titanium.UI.createLabel({
		text: 'アイテム名',
		height: 35,
		width: 300,
		top: 10
	});
	view.add(nameLabel);

	var db = require('database');
	var itemObj = db.selectItemById(item_id);

	var textAreaForName = Titanium.UI.createTextArea({
		value: itemObj.name,
		height: 35,
		width: 300,
		top: 47,
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		font: {fontSize: 16}
	});
	view.add(textAreaForName);

	var memoLabel = Titanium.UI.createLabel({
		text: 'メモ',
		height: 35,
		width: 300,
		top: 100
	});
	view.add(memoLabel);

	var textAreaForMemo = Titanium.UI.createTextArea({
		value: itemObj.memo,
		height: 150,
		width: 300,
		top: 137,
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		font: {fontSize: 16}
	});
	view.add(textAreaForMemo);

	var saveButton = Titanium.UI.createButton({
		title: '保存',
		width: 30,
		height: 20
	});
	self.rightNavButton = saveButton;

	saveButton.addEventListener('click', function() {
		db.updateItemById(textAreaForName.value, textAreaForMemo.value, item_id);
		Titanium.App.fireEvent('editItem');
	});

	var deleteButton = Titanium.UI.createButton({
		top: 320,
		left: 110,
		width: 100,
		height: 44,
		title: '削除',
		color:'#ff0000'
	});
	view.add(deleteButton);

	deleteButton.addEventListener('click', function() {
		db.deleteItem(item_id);
		Titanium.App.fireEvent('editItem');
	});

	self.add(view);

	return self;
}

module.exports = editWindow;