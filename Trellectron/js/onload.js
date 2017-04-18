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

    var view = this;
    view.initializeTrello();
	setInterval("getTodaysCard()",10000);// 10sec
}


function initializeTrello()
{
    Trello.authorize({
        interactive: true,
        type: "popup",
        expiration: "never",
        name: "surveyrequest",
        persist: "true",
        success: function() {
            onAuthorizeSuccessful();
        },
        error: function() {
            onFailedAuthorization();
        },
        scope: {
            read: true,
            write: true
        },
    });

}

function onAuthorizeSuccessful()
{
    console.log('Successful authentication');
	// var todayList = view.getSpecifiedList('Today');
    getTodaysCard();
}

function onFailedAuthorization()
{
    console.log('Failed authentication');
}

function onRejectted()
{
	console.log('promise error!');
}

var success = function(successMsg)
{
	console.log('success!');
	console.log(successMsg);
};

var error = function(errorMsg)
{
	console.log('faild');
	console.log(errorMsg);
};

function getSpecifiedList(label)
{
	console.log('get list')

// 	listObj = new Object();
// successMsg.forEach( function(obj){
// 	if ( label == obj['name'] ){
// 		listObj.id = obj['id'];
// 		listObj.name = obj['name'];
// 		return;
// 	}
// });
// return listObj;

	// Trello.get(
	// 	'/boards/{your board id}/lists',
	// 	success,
	// 	error
	// );
	// console.log(success);
	
}

function getTodaysCard()
{
    console.log('get card')

    Trello.get(
        '/lists/{you list id}/cards',
        success,
        error
    );
	
}
