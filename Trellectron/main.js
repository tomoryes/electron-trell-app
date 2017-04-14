'use strict';

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const App = electron.app;
// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;
// メニュー表示用モジュール
const Menu = electron.Menu;
// ステータスバーへのアイコンを表示するモジュール
const Tray = electron.Tray;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
App.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        App.quit();
    }
});

// Electronの初期化完了後に実行
App.on('ready', function() {

    initializeWindow();
    setupMenu();
    setupStatusBarIcon();
});


function initializeWindow() {
    // メイン画面の表示。ウィンドウの幅、高さを指定できる
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

}


/**
 *  コピー＆ペーストを実装する
 *  see http://hacknote.jp/archives/16729/
 */
function setupMenu() {
    var template = [{
        label: "Application",
        submenu: [{
                label: "About Application",
                selector: "orderFrontStandardAboutPanel:"
            },
            {
                type: "separator"
            },
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: function() {
                    App.quit();
                }
            }
        ]
    }, {
        label: "Edit",
        submenu: [{
                label: "Undo",
                accelerator: "CmdOrCtrl+Z",
                selector: "undo:"
            },
            {
                label: "Redo",
                accelerator: "Shift+CmdOrCtrl+Z",
                selector: "redo:"
            },
            {
                type: "separator"
            },
            {
                label: "Cut",
                accelerator: "CmdOrCtrl+X",
                selector: "cut:"
            },
            {
                label: "Copy",
                accelerator: "CmdOrCtrl+C",
                selector: "copy:"
            },
            {
                label: "Paste",
                accelerator: "CmdOrCtrl+V",
                selector: "paste:"
            },
            {
                label: "Select All",
                accelerator: "CmdOrCtrl+A",
                selector: "selectAll:"
            }
        ]
    }];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}


function setupStatusBarIcon() {
    // メニューアイコン設定
    var appIcon = new Tray(__dirname + '/../icon.png');
    // コンテキストメニュー追加
    var contextMenu = Menu.buildFromTemplate([{
            label: '選択メニュー1',
            type: 'radio'
        },
        {
            label: '選択メニュー2',
            type: 'radio'
        },
        {
            type: 'separator'
        },
        {
            label: 'サブメニュー',
            submenu: [{
                    label: 'サブメニュー1'
                },
                {
                    label: 'サブメニュー2'
                }
            ]
        },
        {
            label: '終了',
            accelerator: 'Command+Q',
            click: function() {
                App.quit();
            }
        }
    ]);
    appIcon.setContextMenu(contextMenu);
    // アイコンにマウスオーバーした時の説明
    appIcon.setToolTip('This is sample.');
}
