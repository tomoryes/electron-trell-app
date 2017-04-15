const Electron = require('electron');
const Shell = Electron.shell;

onload = function() {
  var webview = document.getElementById("main-window-webview");
  webview.addEventListener('new-window', function(e) {
    Shell.openExternal(e.url);
  });
}
