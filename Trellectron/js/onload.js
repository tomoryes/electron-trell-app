const electron = require('electron');
const shell = electron.shell;

var boards = [];
onload = function()
{
	var view = this;
    console.log('loading');

	// see http://blog.yuhiisk.com/archive/2014/12/20/dynamic-loading-and-complete-processing-of-script.html
	loadScript("{YOUR Trello BOARD URL}", otherSetting);
}

//各種設定
function otherSetting()
{
	// cssを入れてレイアウトを縦割り
	var webview = document.querySelector('webview');
	webview.addEventListener("did-finish-load", function(){
		webview.insertCSS("#board{ flex-direction: row; flex-wrap: wrap; overflow-x: hidden !important; overflow-y: auto !important; display: flex; align-content: flex-start; }");
		webview.insertCSS("#board .list-wrapper{ margin: 0 0 10px 10px; height: auto; }");
		webview.insertCSS("#board .list-wrapper .js-list-content{ max-height: 40vh; }");
	});
	
	// リンクをクリックしたら外部ブラウザで開く設定
	var mainview = document.getElementById("main-window-webview");
    mainview.addEventListener('new-window', function(e) {
        shell.openExternal(e.url);
    });
}

function loadScript(src, callback) {
	var webview = document.createElement('webview');
	webview.src = src;
	webview.id = "main-window-webview";
	document.body.appendChild(webview);

    callback();
}
