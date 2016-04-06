$('.image').click(function (event) {
    var $image = $(event.target)
    var tags = $image.data('tags').replace(/ /g, '').split(',').filter(Boolean)
    $('#tag-listing').empty()
    tags.forEach(function (tag){
        $('#tag-listing').append('<a class="twelve columns" href="/tags/'+tag+'"><h4>'+tag+'</h4></a>')
    });
})

validUser(function() {
    $('#upload-button').remove()
},
function() {
    $('#user-buttons').remove()
})