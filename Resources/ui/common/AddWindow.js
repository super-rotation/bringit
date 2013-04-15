function addWindow(title, tableType, id) {
    var self = Titanium.UI.createWindow({
        title: title,
        backgroundColor: '#fff'
    });

    var view = Titanium.UI.createView();

    var db = require('database');

    var textArea = Titanium.UI.createTextArea({
        height: 150,
        width: 300,
        top: 10,
        font: {fontSize: 20},
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 5
    });
    view.add(textArea);

    var saveButton = Titanium.UI.createButton({
        title: '保存',
        width: 30,
        height: 20
    });
    self.rightNavButton = saveButton;

    saveButton.addEventListener('click', function() {
        if (textArea.value) {
            if (tableType === 'destination') {
                var icon_id = 10000;
                db.addDestination(textArea.value, icon_id);
                Titanium.App.fireEvent('addDestination');
            }
            else if (tableType === 'item') {
                db.addItem(textArea.value, id);
                Titanium.App.fireEvent('addItem');
            }
            else if (tableType === 'category') {
                db.addCategory(textArea.value);
                Titanium.App.fireEvent('addCategory');
            }
        }
    });

    self.add(view);

    return self;
}

module.exports = addWindow;
