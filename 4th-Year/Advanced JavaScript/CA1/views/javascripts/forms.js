
// @TODO documentation
var submit = function(formType) {
    return function (event) {
        var data
          , username = $('.username').val()
          , password = $('.password').val()

        if (formType == 'login') {

            data = { username: username
                   , password: password
                   }

        } else if(formType == 'register') {

            var confirm = $('.confirm').val()

            if (confim != password) {
                $('#error').val('passwords don\'t match.')
                return false
            }

            data = { username : username
                   , password : password
                   , confirm : confirm
                   }

        }

        $.ajax({
            url: '/users/'+formType,
            method: 'POST',
            data: data,
            success: function (argument) {
                // body...
            }
        })
        // Is the same in jQuery as having both event.preventDefault() and event.stopPropgation()
        return false
    }
}

$('#login').submit(submit('login'))

$('#register').submit(submit('register'))