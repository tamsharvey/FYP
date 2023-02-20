
// uploading user information 
function uploadUserInfo() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-ct216giggy.cloudfunctions.net/uploaduserinfo');

	var entertainment = document.querySelector('input[name="entertainment"]:checked').value;
	const checkboxes = document.querySelectorAll('input[name="music"]:checked');
	var description = document.getElementById('description').value;
	var name = document.getElementById('name').value;
	

	let music = [];
		checkboxes.forEach((checkbox) => {
		music.push(checkbox.value);
	});
	
    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
				if(entertainment=="act"){
					window.location.href = "/venues.html"
				}
				else if(entertainment=="venue"){
					window.location.href = "/acts.html"
				}
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };

     xhr.send(JSON.stringify(
	{"name":name,"entertainment": entertainment,"types": music,"description":description ,"uid" : getCookie('uid')}
    ));
}

// W3C Schools
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
