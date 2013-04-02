var win = Titanium.UI.currentWindow;

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

win.add(textArea);

var addNewListButton = Titanium.UI.createButton({
    top: 170,
    right: 10,
    width: 100,
    height: 44,
    title: '追加'
});

addNewListButton.addEventListener('click', function() {
    if(textArea.value){
        db.addDestination(textArea.value);
        Titanium.App.fireEvent('updateDestination');
        win.close({animated: true});
    }
});

win.add(addNewListButton);