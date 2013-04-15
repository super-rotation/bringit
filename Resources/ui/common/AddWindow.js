function addWindow(title, tableType, id) {
    var self = Titanium.UI.createWindow({
        title: title + 'を追加',
        backgroundColor: '#fff'
    });

    var view = Titanium.UI.createView();

    var util = require('ui/common/util');
    var conf = require('ui/common/conf');
    var db = require('database');

    var destinationLabel = Titanium.UI.createLabel({
        text: title + '名',
        height: 35,
        width: 300,
        top: 10,
        font: {fontWeight: 'bold'}
    });
    view.add(destinationLabel);

    var textArea = Titanium.UI.createTextArea({
        height: 35,
        width: 300,
        top: 47,
        font: {fontSize: 16},
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 5
    });
    view.add(textArea);

    if (tableType === 'destination') {
        var iconLabel = Titanium.UI.createLabel({
            text: 'アイコン',
            height: 35,
            width: 300,
            top: 120,
            font: {fontWeight: 'bold'}
        });
        view.add(iconLabel);

        iconButtons = [];
        var initial_icon_id = util.getMinKey(conf.iconMap);
        var selected_icon_id = initial_icon_id;
        var iconNum = util.countArrayElements(conf.iconMap);
        var halfIconNum = parseInt(0.5 * iconNum);
        for (var i = 0; i < iconNum; i++) {
            var icon_id = initial_icon_id + i;
            var width = 30;
            var left = 45 + (width + 20) * (i % 5);
            if (i === halfIconNum) left = 45;
            var colorType = (icon_id === initial_icon_id) ? 'dark' : 'light';
            var iconButton = Titanium.UI.createButton({
                title: '',
                top: (i < halfIconNum) ? 165 : 215,
                left:　left,
                width: width,
                height: 'auto',
                backgroundImage: 'image/' + colorType + '_' + conf.iconMap[icon_id] + '.png',
                font: {fontSize: 25, fontWeight: 'bold'},
                icon_id: icon_id
            });
            iconButtons.push(iconButton);
            view.add(iconButton);
            iconButton.addEventListener('click', function(e) {
                for (var j = 0; j < iconButtons.length; j++) {
                    var button = iconButtons[j];
                    button.backgroundImage = 'image/light_' + conf.iconMap[button.icon_id] + '.png';
                }
                selected_icon_id = e.source.icon_id;
                this.backgroundImage = 'image/dark_' + conf.iconMap[selected_icon_id] + '.png';
            });
        }
    }

    var saveButton = Titanium.UI.createButton({
        title: '保存',
        width: 30,
        height: 20
    });
    self.rightNavButton = saveButton;

    saveButton.addEventListener('click', function() {
        if (textArea.value) {
            if (tableType === 'destination') {
                db.addDestination(textArea.value, selected_icon_id);
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
