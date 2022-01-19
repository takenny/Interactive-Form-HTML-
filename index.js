var time= 3
var offset = '440';
var i = 1;
var file_uploaded = false;
var finished_uploading = false;
var fileURL;

$(document).ready(function(){

    toggleSubmit(hasEmptyFields());
    addListenersToTextBoxes();

    //----------shows upload form screen -----------------------
    $('#userPic a').click(function(){
        $('#upload-form').show();
    });
    $('#userPic').click(function(){
        $('#upload-form').show();
    });

    //------------- Get the Data from file input ----------------
    $('#browse-button').change(function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            fileURL = reader.result;
            $('#upload-error').css('color', 'white');
            $('#up-arrow').html('<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>');   
            $('#up-arrow path').css('fill','#000000');
            $('.circle-animation').show();
        }
        if(file){
            file_uploaded = true;
            reader.readAsDataURL(file);
        } else {

        }
    })
    //"uploads" an image via circle animation before closing the upload form screen
    $('#upload-button').click(function(){
        if(file_uploaded) {
            $('#userPic svg').hide();
            $('#userPic a').hide();
            $('#userPic').css('background-image', 'url("' + fileURL + '")');
            var interval = setInterval(function() {
                if (i == time) {
                    clearInterval(interval);
                    i = 1;
                    $('.circle-animation').hide();
                    $('.circle-animation').css('stroke-dashoffset', offset);
                    $('#up-arrow').html('<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>');   
                    $('#up-arrow path').css('fill','#32d306');
                    $('#upload-form').delay(1500).hide(0);
                    $('#circle-svg').show();
                    return;
                }
                $('.circle-animation').css('stroke-dashoffset', offset - ((i+1)*(offset/time)));
                i++;
            }, 1000);

        } else {
            $('#up-arrow').html('<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>');   
            $('#up-arrow path').css('fill','#e52222');
            $('#upload-error').css('color', 'red');
        }

    });
    
    

    //-----Close the file imput form when the x button is clicked
    $('#close-upload').click(function(){
        $('#upload-form').hide();
        this.val(null);
        $('.circle-animation').css('stroke-dashoffset', offset);
    });
});

function toggleSubmit(hasEmpty)
{
    var button = document.getElementById("submitButton");

    if(hasEmpty || button.textContent != "Submit")
    {
        button.disabled = true;
    }
    else
    {
        button.disabled = false;
    }
}

function hasEmptyFields()
{
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zipCode = document.getElementById("zipCode").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    
    if(firstName == "" || lastName == "" || dob == "" || username == "" ||
    email == "" || password == "" || confirmPassword == "" || address == "" ||
    city == "" || state == "" || zipCode == "" || phoneNumber == "") 
    {
        return true;
    }
    else
    {
        return false;
    }
}

function addListenersToTextBoxes()
{
    $(':text').each(function() 
    {
        $(this).bind('keyup', function()
        {
            toggleSubmit(hasEmptyFields());
        });
    });

    $(':password').each(function() 
    {
        $(this).bind('keyup', function()
        {
            toggleSubmit(hasEmptyFields());
        });
    });
}

function submitValidateFields()
{
    var dob = document.getElementById("dob").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var email = document.getElementById("email").value;
    var zip = document.getElementById("zipCode").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var hasErrors = false;
    var message = "Error(s):\n";
    var button = document.getElementById("submitButton");
    var errorMessage = document.getElementById("errorMessage");

    if(!validateDOB(dob))
    {
        document.getElementById("dob").classList.add("error");
        message += "Invalid DOB, must be mm/dd/yyyy.\n";
        hasErrors = true;
    }
    else
    {
        document.getElementById("dob").classList.remove("error");
    }

    if(!validateEmail(email))
    {
        document.getElementById("email").classList.add("error");
        message += "Invalid E-Mail.\n";
        hasErrors = true;
    }
    else
    {
        document.getElementById("email").classList.remove("error");
    }

    if(!(password == confirmPassword))
    {
        document.getElementById("password").classList.add("error");
        document.getElementById("confirmPassword").classList.add("error");
        message += "Passwords do not match.\n"
        hasErrors = true;
    }
    else
    {
        document.getElementById("password").classList.remove("error");
        document.getElementById("confirmPassword").classList.remove("error");
    }

    if(!validateZip(zip))
    {
        document.getElementById("zipCode").classList.add("error");
        message += "Invalid zip code.\n";
        hasErrors = true;
    }
    else
    {
        document.getElementById("zipCode").classList.remove("error");
    }

    if(!validatePhone(phoneNumber))
    {
        document.getElementById("phoneNumber").classList.add("error");
        message += "Invalid phone number.\n";
        hasErrors = true;
    }
    else
    {
        document.getElementById("phoneNumber").classList.remove("error");
    }

    if(!hasErrors)
    {
        errorMessage.hidden = true;
        button.textContent = "Submitting...";
         button.disabled = true;
         $(button).html('Submitting... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
         setTimeout(function() 
         {
             button.textContent = "Submitted!"
             button.classList.add("button-animation");
         }, 3000);
    }
    else
    {
        errorMessage.textContent = message;
        errorMessage.hidden = false;
    }

}

function validateEmail(email) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.toLowerCase()))
  {
    return true;
  }
    return false;
}
function validatePhone(phone) 
{
 if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone))
  {
    return true;
  }
    return false;
}

function validateZip(zip) 
{
    return /^\d{5}(-\d{4})?$/.test(zip);
}

function validateDOB(dob)
{
    return /^\d{1,2}([/])\d{1,2}\1\d{4}$/.test(dob);
}
