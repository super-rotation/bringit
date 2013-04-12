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

    var addButton = Titanium.UI.createButton({
        top: 170,
        right: 10,
        width: 100,
        height: 44,
        title: '追加'
    });
    view.add(addButton);

    addButton.addEventListener('click', function() {
        if (textArea.value) {
            if (tableType === 'destination') {
                db.addDestination(textArea.value);
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
