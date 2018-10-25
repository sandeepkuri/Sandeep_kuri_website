/*-----------------------------------------------------------------------------------
/*
/* Comingsoon JS
/*
-----------------------------------------------------------------------------------*/



$(document).ready(function() {
    $("#id_submit").click(function(e) {
        e.preventDefault();
        var emailaddress = $('#useremail').val();
        console.log(emailaddress);
        // alert(emailaddress);
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/subscribe",
            data: {
                "email": emailaddress,
            },
            success: function(data) {
                console.log(data);
                if (data.msg == "send") {
                    alert("email sent");
                } else {
                    alert(data);
                }
            },
            dataType: "json"
        });
        // return false;
    });

});