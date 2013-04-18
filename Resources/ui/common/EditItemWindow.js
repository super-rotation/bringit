function EditItemWindow(name, destination_id, item_id) {
	var self = Titanium.UI.createWindow({
		title: name,
		backgroundColor: '#fff'
	});

	var view = Titanium.UI.createView();

	var nameLabel = Titanium.UI.createLabel({
		text: 'アイテム名',
		height: 20,
		width: 300,
		top: 10,
		left: 50,
		font: {fontWeight: 'bold'}
	});
	view.add(nameLabel);

	var db = require('database');
	var itemObj = db.selectItemById(item_id);

	var initialValue;
	var checkbox = Titanium.UI.createButton({
		title: '',
		top: 35,
		left: 10,
		width: 30,
		height: 'auto',
		backgroundColor: '#fff',
		backgroundImage: 'image/light_case.png',
		color: '#fff',
		font: {fontSize: 25, fontWeight: 'bold'},
		value: false, //value is a custom property in this casehere.
		item_id: item_id
	});
	checkbox.on = function() {
		this.backgroundImage = 'image/dark_case.png';
		this.value = true;
	};
	checkbox.off = function() {
		this.backgroundImage = 'image/light_case.png';
		this.value = false;
	};
	if (db.countDestinationItemByIds(destination_id, item_id)) {
		checkbox.on();
		initialValue = true;
	}
	else {
		checkbox.off();
		initialValue = false;
	};
	checkbox.addEventListener('click', function(e) {
		if(false == e.source.value){
			e.source.on();
		}
		else {
			e.source.off();
		}
	});
	view.add(checkbox);
	var textAreaForName = Titanium.UI.createTextField({
		value: itemObj.name,
		height: 35,
		width: 260,
		top: 35,
		left: 50,
		verticalAlign: 'middle',
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		font: {fontSize: 16},
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS
	});
	view.add(textAreaForName);

	var memoLabel = Titanium.UI.createLabel({
		text: 'メモ',
		height: 35,
		width: 300,
		top: 100,
		font: {fontWeight: 'bold'}
	});
	view.add(memoLabel);

	var textAreaForMemo = Titanium.UI.createTextArea({
		value: itemObj.memo,
		height: 90,
		width: 300,
		top: 136,
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		font: {fontSize: 16},
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
		if (checkbox.value !== initialValue) {
			if (checkbox.value === true) {
				db.addDestinationItem(destination_id, item_id);
			}
			else {
				db.deleteDestinationItem(destination_id, item_id);
			}
		}
		Titanium.App.fireEvent('editItem');
		Titanium.App.fireEvent('updateItemStatus');
	});

	var deleteButton = Titanium.UI.createButton({
		top: 260,
		left: 110,
		width: 100,
		height: 44,
		title: '削除',
		color:'#ff0000'
	});
	view.add(deleteButton);

	deleteButton.addEventListener('click', function() {
		var dialog = Titanium.UI.createAlertDialog({
			title: 'アイテムの削除',
			message: '本当に「' + name + '」を削除してもよろしいですか？',
			buttonNames: ['OK', 'キャンセル'],
			cancel: 1
		});
		dialog.addEventListener('click', function(e) {
			if (e.index === 0) {
				db.deleteItem(item_id);
				Titanium.App.fireEvent('editItem');
			}
		});
		dialog.show();
	});

	self.add(view);

	return self;
}

module.exports = EditItemWindow;