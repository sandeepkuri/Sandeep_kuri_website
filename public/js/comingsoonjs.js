/*-----------------------------------------------------------------------------------
/*
/* Comingsoon JS
/*
-----------------------------------------------------------------------------------*/



$(document).ready(function() {
    window.onload = function() {};
    $("#id_submit").click(function() {
        var emailaddress = $('#useremail').val();
        // alert(emailaddress);
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/subscribe",
            data: {
                "email": emailaddress,
            },
            success: function(msg) {
                console.log(msg);

            }
        });

    });
});