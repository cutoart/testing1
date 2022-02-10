$(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
});

$(document).ready(function() {

    function validateEmail() {
        var a = document.getElementById("email").value;
        //alert(a)
        var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
        if (filter.test(a) && a != "") {
            return true;
        } else {
            return false;
        }
    }

    $("#close_form").click(function() {
        $('#msg').html("<b>enquire,</b> Let's Start a Conversation !");
        $("#contactusForm")[0].reset();

        document.getElementById("email").style.backgroundColor = "white";
        document.getElementById("email").style.border = "white";
        $('.default-value').each(function() {

            this.style.backgroundColor = "white";
            this.style.border = "white";

        });

    });

    $('#email').blur(function() {
        //alert(validateEmail())
        if (validateEmail()) {
            document.getElementById("email").style.backgroundColor = "white";
            document.getElementById("email").style.border = "white"
        } else {
            //	alert('Hello')
            document.getElementById("email").style.backgroundColor = '#F57065';
            document.getElementById("email").style.border = '#F57065'
        }
    });    

    $('.default-value').each(function() {        

        var value = this.value;
        $(this).blur(function() {
            if (this.value != '') {
                this.style.backgroundColor = "white";
                this.style.border = "white";
            } else {
                this.style.backgroundColor = "#F57065";
                this.style.border = "#F57065";

            }
        });

    });


    $('#contactusForm').submit(function() {

        var flag = true;
        $('.default-value').each(function() {
            var value = this.value;
            //alert(value);
            if (this.value == "") {
                this.style.backgroundColor = "#F57065";
                this.style.border = "#F57065";
                flag = false;
            }

        });

        if (validateEmail()) {

            document.getElementById("email").style.backgroundColor = "white";
            document.getElementById("email").style.border = "white"

        } else {
            //	alert('Hello')
            document.getElementById("email").style.backgroundColor = "#F57065";
            document.getElementById("email").style.border = "#F57065";
            flag = false;
        }

        // show that something is loading	        
        // Call ajax for pass data to other place
        if (flag) {

            
            var selectedCountry = $(".selected-flag").attr("Title");
            $.ajax({
                type: 'POST',
                url: 'get_information.php?country='+selectedCountry,
                data: $(this).serialize(),
                success: function(response) {                    
                    $('#msg').html(response);
                    $("#contactusForm")[0].reset();
                }
            })
            
        }

        // to prevent refreshing the whole page page
        return false;

    });
    
    $(window).scrollTop(0);
});

(function() {
    var  dotsMenu;
    dotsMenu = document.querySelector(".dots");
    
    dotsMenu.addEventListener("click", function() {
      return dotsMenu.classList.toggle("on");
    });
  
}).call(this);