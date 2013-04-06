function AddingWindow(title) {
    var self = Titanium.UI.createWindow({
        title: title,
        backgroundColor: '#fff'
    });

    var view = Titanium.UI.createView();

    Titanium.include('database.js');
    var db = new bringitDB();

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

    var addingButton = Titanium.UI.createButton({
        top: 170,
        right: 10,
        width: 100,
        height: 44,
        title: '追加'
    });
    view.add(addingButton);

    addingButton.addEventListener('click', function() {
        if (textArea.value) {
            db.addDestination(textArea.value);
            Titanium.App.fireEvent('addDestination');
        }
    });

    self.add(view);

    return self;
}

module.exports = AddingWindow;
