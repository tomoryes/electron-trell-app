'use strict';

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;
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
app.on('ready', function() {
    setupMenu();
    // setupStatusBarIcon();
    initializeWindow();
});

/************************
 * initialization
 ************************/
 
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
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    mainWindow.show();
});

app.on('before-quit', function() {
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
                    accelerator: "Cmd+Q",
                    click: function() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: "Edit",
            submenu: [{
                    label: "Undo",
                    accelerator: "Cmd+Z",
                    selector: "undo:"
                },
                {
                    label: "Redo",
                    accelerator: "Shift+Cmd+Z",
                    selector: "redo:"
                },
                {
                    type: "separator"
                },
                {
                    label: "Cut",
                    accelerator: "Cmd+X",
                    selector: "cut:"
                },
                {
                    label: "Copy",
                    accelerator: "Cmd+C",
                    selector: "copy:"
                },
                {
                    label: "Paste",
                    accelerator: "Cmd+V",
                    selector: "paste:"
                },
                {
                    label: "Select All",
                    accelerator: "Cmd+A",
                    selector: "selectAll:"
                }
            ]
        },
        {
            label: "Window",
            submenu: [{
                    label: "Close",
                    accelerator: "Cmd+W",
                    role: "close"
                },
                {
                    label: "Minimize",
                    accelerator: "Cmd+M",
                    role: "minimize"
                },
                {
                    type: "separator"
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+Cmd+I',
                    click: function() {
                        BrowserWindow.getFocusedWindow().toggleDevTools();
                    }
                }
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/**
 *  メニューバーにアイコンを追加する
 */
function setupStatusBarIcon() {
    // メニューアイコン設定
    appIcon = new Tray(__dirname + '/img/statusbar_icon.png');
    // コンテキストメニュー追加
    var template = [{
        label: 'Today Task',
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
        ],
    }];
    appIcon.setContextMenu(Menu.buildFromTemplate(template));
}
