

/*-----------------------------------------------------------------------------------
/*
/* Comingsoon JS
/*
-----------------------------------------------------------------------------------*/

$("#contactForm").submit(function(e) {
    debugger;
    e.preventDefault(); // Prevents the page from refreshing
    var $this = $(this); // `this` refers to the current form element
    var emailaddress = document.getElementById("contactEmail").value;
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

  function submit(){
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
      return false;
  }
