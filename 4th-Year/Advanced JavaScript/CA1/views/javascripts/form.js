$('#register').click(function (event) {
    event.preventDefault()
    event.stopPropagation()
    var data
      , username = $('.username').val()
      , password = $('.password').val()
      , confirm  = $('.confirm').val()

    if (confirm != password) {
      $('#error').val('passwords don\'t match.')
    }

    data = { username : username
           , password : password
           , confirm : confirm
           }


    $.ajax({
        url: '/users/register',
        method: 'POST',
        data: data,
        success: function (data) {
            localStorage.setItem('user', data)
            window.location = '/'
        }, 
        error: function() {
            console.log(arguments);
            $('#error').val('Error registering')
        }
    })
})

$('#login').click(function (event) {
    event.preventDefault()
    event.stopPropagation()
    var data
      , username = $('.username').val()
      , password = $('.password').val()

        data = { username: username
               , password: password
               }

    $.ajax({
        url: '/users/login',
        method: 'POST',
        data: data,
        success: function (data) {
            localStorage.setItem('user', data)
            window.location = '/'
        }, 
        error: function() {
            $('#error').val('No user with that username, or password exists.')
        }
    })
})

function validUser(error, success) {
    var userId = localStorage.getItem('user')
    if (!userId) {
        error()
    } else {
        $.ajax({
            url: '/users/validate',
            method: 'POST',
            data: {id: userId},
            error: error,
            success: success
        })
    }
}