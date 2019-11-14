function recallLookup() {
    var VIN = $('.VINLookup').val();
    try
    {
        adobeAnalytics.checkForRecallClicked(VIN);
    }
    catch (err){}

  if (VIN != '')
  {
      $('#recalls').html('');
      var url = 'RecallLookup.php?vin='+VIN;
      $.ajax({
        type : "GET",
        dataType : 'html',
        url : url,
        success : function(data) {
          if (!(data === undefined)) {
            $('#recalls').html(data);
            $('#recalls').focus();
            appendVin();
          }
        },
        error : function(xhr, ajaxOptions, thrownError) {
          xhr.abort;
        },
        cache : false,
        async : true,
        timeout: 10000
      });
  } else {
    // $('.VINLookup').css('border-color', 'red');
  }
}

var $ERROR_OPTIN_MESSAGE =  "Your submission could not be processed at this time. Please try again.";
var $SUCCESS_OPTIN_MESSGE = "Thank you. We will notify you when there are updates to the recall status of this vehicle.";
var $EMAIL_INVALID_MESSAGE = "Email format is invalid. (Example: mymazda@mazda.com)";
var $REQUIRED_FIELD_MESSAGE = "The fields in red are required.";
var $CONFIRMED_EMAIL_INVALID_MESSAGE = "Emails entered do not match. Please correct and submit.";
var $REQUIRED_VIN_MESSAGE = "VIN is invalid format. (17 characters)";

function optinViewResult()
{
    $("#VINLookup").val($("#optinVin").val());
    $("#modalRecallOptin").modal('hide');
    searchRecallLookup();
}

function validateOptinFields()
{
    $("#optinResult").css('color', '');
    $("#optinResult").html("");
    $("#optinVinLabel").removeClass("err");
    $("#firstNameLabel").removeClass("err");
    $("#lastNameLabel").removeClass("err");
    $("#optinEmailLabel").removeClass("err");
    $("#optinConfirmedEmailLabel").removeClass("err");

    var isValid = true;
    /* blank check fori inputs.*/
    if ($("#optinVin").val() == ""){
       $("#optinVinLabel").addClass("err"); isValid = false;
    }
    if ($("#firstName").val() == ""){
        $("#firstNameLabel").addClass("err"); isValid = false;
    }
    if ($("#lastName").val() == ""){
        $("#lastNameLabel").addClass("err"); isValid = false;
    }
    if ($("#optinEmail").val() == ""){
        $("#optinEmailLabel").addClass("err"); isValid = false;
    }
    if ($("#optinConfirmedEmail").val() == ""){
        $("#optinConfirmedEmailLabel").addClass("err"); isValid = false;
    }

    if (!isValid) {
        $("#optinResult").css('color', 'red');
        $('#optinResult').html($REQUIRED_FIELD_MESSAGE);

        return false;
    }

    var errMsg = "";

    if ($("#optinVin").val().match(/^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}[A-Za-z\d]{6}$/) == null) {
        errMsg = $REQUIRED_VIN_MESSAGE;
        $("#optinVinLabel").addClass("err");
        isValid = false;
    }

    if ($("#optinEmail").val().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) == null) {
        if (isValid) errMsg = $EMAIL_INVALID_MESSAGE;
        $("#optinEmailLabel").addClass("err");
        isValid = false;
    }

    if ($("#optinConfirmedEmail").val().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) == null) {
        if (isValid) errMsg = $EMAIL_INVALID_MESSAGE;
        $("#optinConfirmedEmailLabel").addClass("err");
        isValid = false;
    }

    if ($("#optinConfirmedEmail").val().localeCompare($("#optinEmail").val()) != 0) {
        if (isValid) errMsg = $CONFIRMED_EMAIL_INVALID_MESSAGE;
        $("#optinConfirmedEmailLabel").addClass("err");
        isValid = false;
    }


    if (!isValid) {
        $("#optinResult").css('color', 'red');
        $('#optinResult').html(errMsg);

        return false;
    }

    return true;
}

function postOptins()
{
    if (validateOptinFields() == true)
    {
         var data = new FormData();
         data.append('email', document.getElementById("optinEmail").value);
         data.append('confirmedEmail', document.getElementById("optinConfirmedEmail").value);
         data.append('firstName', document.getElementById("firstName").value);
         data.append('lastName', document.getElementById("lastName").value);
         data.append('vin', document.getElementById("optinVin").value);
         data.append('dealerNumber', dealerNumber);

         $.ajax({
            url: "/optin.php?" + Math.random(),
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(resp){
                if (resp.trim().localeCompare('success') === 0)
                {
                    $("#optinResult").css('color', 'green');
                    $("#optinResult").html($SUCCESS_OPTIN_MESSGE);
                    $("#optinButton").removeClass("optinSubmit");
                    $("#optinButton").addClass("optinClickButtonHide");
                    $("#optinSearchResult").removeClass("optinClickButtonHide");
                    $("#optinSearchResult").addClass("optinViewResult");
                }
                else
                {
                    $("#optinResult").css('color', 'red');
                    $("#optinResult").html($ERROR_OPTIN_MESSAGE);
                }
            },
            error: function (resp){
                $("#optinResult").css('color', 'red');
                $("#optinResult").html($ERROR_OPTIN_MESSAGE);
            }
        });
    }

    return false;
}
