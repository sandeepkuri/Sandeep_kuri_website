/*-----------------------------------------------------------------------------------
/*
/* Comingsoon JS
/*
-----------------------------------------------------------------------------------*/



$(document).ready(function() {

    $("#contactForm").submit(function(e) {
        debugger;
        e.preventDefault(); // Prevents the page from refreshing
        var $this = $(this); // `this` refers to the current form element
        var emailaddress = document.getElementById("useremail").value;
        $.ajax({

          type: "POST",
          url: "http://localhost:5000/subscribe",
          data: {"email": emailaddress},
          success: function(msg) {

              // Message was sent
              if (msg == 'OK') {
                 alert("ok");
              }
              // There was an error
              else {
            alert("not ok");
              }

          }

        });
    });


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
                if (data == "send") {
                    alert("email sent");
                } else {
                    alert(data);
                }
            }
        });
        return false;
    });

});
