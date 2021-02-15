$('.modules-menu-list-item').on('click', function(event){
    $('#modules-gif').attr('src', 'img/' + this.getAttribute('data'))
});