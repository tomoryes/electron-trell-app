onload = function() {
	console.log('loading');

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

    function onAuthorizeSuccessful() {
		console.log('Successful authentication');
		getTodaysCard()
    }

    function onFailedAuthorization() {
		console.log('Failed authentication');
    }
	
	function getTodaysCard() {
		console.log('get card')

		var success = function(successMsg) {
			console.log('success!');
			console.log(successMsg);
		};

		var error = function(errorMsg) {
			console.log('faild');
			console.log(errorMsg);
		};
		
		Trello.get(
				'/lists/{YOU LIST ID}/cards',
				success,
				error
			);
	}
}
