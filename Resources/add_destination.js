var win = Titanium.UI.currentWindow;

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
    title: '行き先を追加'
});

addNewListButton.addEventListener('click', function() {
    win.close();
});

win.add(addNewListButton);