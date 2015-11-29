// Small javascript to check if the user is logged in. Excluded from the rest to 
// Have some paths that require validation, but not all.
var userId = localStorage.getItem('user')
if (!userId) {
    window.location = '/register'
} else {
    $.ajax({
        url: '/users/validate',
        method: 'POST',
        data: {id: userId},
        error: function() {
            window.location = '/register'
        }
    })
}