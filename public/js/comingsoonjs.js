/*-----------------------------------------------------------------------------------
/*
/* Comingsoon JS
/*
-----------------------------------------------------------------------------------*/



$(document).ready(function() {
    window.onload = function() {};
    $("#id_submit").click(function() {
        var emailaddress = $('#useremail').val();
        console.log(emailaddress);
        // alert(emailaddress);
        $.ajax({
            async: "true",
            type: "POST",
            url: "http://localhost:5000/subscribe",
            data: {
                "email": emailaddress,
            },
            success: function(msg) {

                if (msg == "OK") {
                    alert("email sent");
                } else {
                    alert(msg);
                }
            }
        });

    });
});