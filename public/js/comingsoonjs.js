

/*-----------------------------------------------------------------------------------
/*
/* Comingsoon JS
/*
-----------------------------------------------------------------------------------*/



  function submit(){

      var emailaddress = document.getElementById("useremail").value;

     
      $.ajax({

	      type: "POST",
	      url: "http://localhost:3000/subscribe",
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










