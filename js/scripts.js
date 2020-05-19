'use strict';

$(document).ready(function(){
        
    // Фильтр
    var posts = $('.work-card');     

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


const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__link');
const open = document.querySelector('.open');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
})



Array.from(navLinks).forEach( link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
            navList.classList.remove('open');
        }
    })
});

document.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    window.pageYOffset > 0 ? header.classList.add('header--shadow') : header.classList.remove('header--shadow');
});
