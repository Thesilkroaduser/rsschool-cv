// -----------------------------jQuery----------------------------------------------------------------------

jQuery(window).scroll(function(){
    var $sections = $('.main-section');
    $sections.each(function(i,el){
        var top  = $(el).offset().top-250;
        var bottom = top + $(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');
        if (scroll > top && scroll < bottom){
            $('a.active_link').removeClass('active_link');
            $('a[href="#'+id+'"]').addClass('active_link');
        }  
    })
});

$("nav").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'), top = $(id).offset().top;
    $('body,html').animate({scrollTop: top - 95}, 600);
});

// -----------------------------PURE-JS----------------------------------------------------------------------

onscroll = function(){
    if(window.scrollY + 1 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
        const serv = document.querySelector('#serv')
        const port = document.querySelector('#port');
        const contact = document.querySelector('#contact');
        serv.classList.remove('active_link');
        port.classList.remove('active_link');
        contact.classList.add('active_link');
    ;}
};
