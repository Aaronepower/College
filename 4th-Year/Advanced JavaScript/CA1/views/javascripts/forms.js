var submit = function(formType) {
    function event (event) {
        event.preventDefault()
        console.log(this, event)
        // $.ajax({
        //     url: '/api/'+formType,

        // })
    }
    return event
}
$('#login').submit(function(event) { event.preventDefault(); console.log(this);})
$('#register').submit(submit('register'))