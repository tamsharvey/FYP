function getSecureAPI(){
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log(firebase.auth().currentUser);
        } else {
            // No user is signed in.
        }
    });
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-ct216giggy.cloudfunctions.net/authorizedendpoint');

// Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
             if (xhr.status === OK) {
				var sHTML = "";
                var data = JSON.parse(xhr.responseText);
                for(var i=0; i<data.length; i++)
                {
					if(data[i].entertainment===entertainment){
						sHTML += "<div class='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>";
						sHTML += "<figure class='effect-ming tm-video-item'>";
						sHTML += "<img src='img/personB.png' alt='Image' class='img-fluid'>";
						sHTML += "<figcaption class='d-flex align-items-center justify-content-center'>";
						sHTML += "<h2>"+ data[i].name +"</h2>";
						sHTML += "<a href='act-detail.html?uid=" +data[i].uid + "'></a>";
						sHTML += "</figcaption>" + "</figure>";
						sHTML += "<div class='d-flex justify-content-between tm-text-gray'>";
						sHTML += "<span class='tm-text-gray-light'>"+ data[i].name +"</span>";
						sHTML += "</div>"+"</div>";
					}
						response.innerHTML = sHTML;
                } 
            }
        } else {
            response.innerHTML = "Unauthorized to view this content";
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
    };
    // Set the Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer' + getCookie('accessToken'))
    xhr.send(null);
}

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
