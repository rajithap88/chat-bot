
$(document).ready(function () {
    localStorage.clear();
    $('input[type=radio][name=optradio]').change(function () {
        if (this.value == 'yes') {
            $("#participantFullName").removeAttr('disabled');
            $("#participantUid").removeAttr('disabled');
        }
        else if (this.value == 'no') {
            $("#uidError").hide()
            $("#uidValidError").hide()
            $("#nameError").hide()
            $("#participantFullName").attr('disabled', 'disabled');
            $("#participantUid").attr('disabled', 'disabled');
        }
    });


    $("#participantFullName").keyup(function (e) {
        if ($('#participantFullName').val().trim().length > 0) {
            $("#nameError").hide()
        }
        else {
            $("#nameError").show()
        }
        
    });

    $("#participantUid").keyup(function (e) {
        var uid = $('#participantUid').val().trim()
        if (uid.length > 0) {
            $("#uidError").hide()
            for (var i = 0; i < uid.length; i++) {
                if (uid.charCodeAt(i) >= 48 && uid.charCodeAt(i) <= 57) {
                    $("#uidValidError").hide()
                }
                else {
                    $("#uidValidError").show()
                    break;
                }
            }
        }
        else {
            $("#uidError").show()
        }
        
        

    });

    $('#consentNext').click(function (e) {

        var name = $('#participantFullName').val().trim();
        var uid = $('#participantUid').val().trim();
        var isUidValid = true
        var isAllValid = false
        var option = $("input[type=radio][name=optradio]:checked").val()
        
        if (option == 'yes') {
            if (!isAllValid) {
                var isnameAvailable = false
                var isuidAvailable = false
                if (uid.length > 0) {
                    for (var i = 0; i < uid.length; i++) {
                        if (uid.charCodeAt(i) >= 48 && uid.charCodeAt(i) <= 57) {
                            isUidValid = true
                        }
                        else {
                            isUidValid = false;
                            break;
                        }
                    }
                }

                if (name.length == 0) {
                    $("#nameError").show()
                    isnameAvailable = false
                }
                else {
                    isnameAvailable = true
                }
                if (uid.length == 0) {
                    $("#uidError").show()
                    isuidAvailable = false
                }
                else {
                    isuidAvailable = true
                }
                if (!isUidValid) {
                    $("#uidValidError").show()
                }
                else {
                    $("#uidValidError").hide()
                }

                if (isnameAvailable && isuidAvailable && isUidValid) {
                    isAllValid = true
                }

            }
        }
        else {
            alert("Thank you for your visit");
            location.reload(true);
        }

        if (isAllValid) {
            var option = $("input[type=radio][name=optradio]:checked").val()
            
            if (option == 'yes') {
                $.ajax({
                    url: '/panas',
                    type: 'GET',
                    success: function (response) {
                            localStorage.setItem("isValid", 'True')
                            window.location.replace(window.location.href + 'panas')
                    },
                    error: function (response) {

                    }
                });
            }
            else {
                alert("Thank you")
            }

        }

    });
});