const electron = require('electron');
const shell = electron.shell;

onload = function()
{
    console.log('loading');

	// リンクをクリックしたら外部ブラウザで開く設定
    var webview = document.getElementById("main-window-webview");
    webview.addEventListener('new-window', function(e) {
        shell.openExternal(e.url);
    });
}
