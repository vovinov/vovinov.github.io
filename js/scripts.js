$(document).ready(function(){
	// плавное перемещение страницы к нужному блоку
	$(".header__btn--work").click(function () {
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		$("body,html").animate({scrollTop: destination }, 800);
    });
    
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

