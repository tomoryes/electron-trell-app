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
// TrayのインスタンスがGCされないようにグローバル宣言
// http://qiita.com/unchi_tokyo/items/a2faeda674fa813db1ad
let appIcon;
// アプリを終了させるかどうかのフラグ
// see https://discuss.atom.io/t/how-to-catch-the-event-of-clicking-the-app-windows-close-button-in-electron-app/21425/8
let willQuitApp = false;


// Electronの初期化完了後に実行
App.on('ready', function() {
    setupMenu();
    setupStatusBarIcon();
    initializeWindow();
});

function initializeWindow() {
    // メイン画面の表示。ウィンドウの幅、高さを指定できる
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600
    });
    mainWindow.loadURL('file://' + __dirname + '/main.html');

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('close', function(e) {
        if (willQuitApp) {
            mainWindow = null;
        } else {
            e.preventDefault();
            mainWindow.hide();
        }
    });
}

/************************
 * App Setting
 ************************/

// 全てのウィンドウが閉じたら終了
App.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        App.quit();
    }
});

App.on('activate', function() {
    mainWindow.show();
});

App.on('before-quit', function() {
    willQuitApp = true
});



/************************
 * function
 ************************/

/**
 *  メニューバーにコピー＆ペーストを実装する
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
        },
        {
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
        },
        {
            label: "Window",
            submenu: [{
                label: "Close",
                accelerator: "Cmd+W",
                click: function() {
                    mainWindow.hide();
                }
            }]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/**
 *  メニューバーにアイコンを追加する
 */
function setupStatusBarIcon() {
    // メニューアイコン設定
    appIcon = new Tray(__dirname + '/img/icon.png');
    // コンテキストメニュー追加
    var contextMenu = Menu.buildFromTemplate([{
        label: 'Today',
        submenu: [{
                label: 'サブメニュー1',
                click: function() {
                    console.log('hogehoge');
                }
            },
            {
                label: 'サブメニュー2',
                click: function() {
                    console.log('foooo');
                }
            }
        ]
    }, ]);
    appIcon.setContextMenu(contextMenu);
}
