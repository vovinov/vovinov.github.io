'use strict';

$(document).ready(function(){
    // плавное перемещение страницы к нужному блоку

    function animateLink(path) {
        $(path).click(function () {
            elementClick = $(this).attr("href");
            destination = $(elementClick).offset().top;
            $("body,html").animate({scrollTop: destination }, 800);
        });
    };

    animateLink('.nav__link--main');
    animateLink('.nav__link--skills');
    animateLink('.nav__link--works');   
    animateLink('.nav__link--contacts');   
    
    // Фильтр
    var posts = $('.works__item');     

    $('.works__category a').click(function() { 
        var customType = $( this ).data('filter');        

        posts
            .hide()
            .filter(function () {
                return $(this).data('cat') === customType;
            })
            .show();
    });

    $('.works__link--all').click(function() {
        posts.show();
    })
});
