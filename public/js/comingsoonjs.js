/*-----------------------------------------------------------------------------------
/*
/* Comingsoon JS
/*
-----------------------------------------------------------------------------------*/



function submit() {

    var emailaddress = document.getElementById("useremail").value;
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:5000/subscribe",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "email": emailaddress
        }
    };
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "send") {
            alert("You have successfully done it ");
        } else {
            alert(" logged in and a Token has been issued to you");
        }
    });
}