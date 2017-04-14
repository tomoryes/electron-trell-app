var webview = document.querySelector('webview');
webview.addEventListener("did-finish-load", function(){
	webview.insertCSS("#board{ flex-direction: row; flex-wrap: wrap; overflow-x: hidden !important; overflow-y: auto !important; display: flex; align-content: flex-start; }");
	webview.insertCSS("#board .list-wrapper{ margin: 0 0 10px 10px; height: auto; }");
	webview.insertCSS("#board .list-wrapper .js-list-content{ max-height: 40vh; }");
});
