$('body').scroll(function() { 
    $('#aside').css('top', $(this).scrollTop());
})