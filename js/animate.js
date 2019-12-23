

anime({
    targets: '.header-news__item',
    keyframes: [
        {opacity: 1, duration: 1000, easing: 'easeOutExpo'},        
        {opacity: 0.5, duration: 2000, translateY: -30, easing: 'easeOutExpo'},
        {opacity: 0.7, duration: 2000, translateY: 0, easing: 'easeInExpo'},
        {opacity: 1, duration: 1000, easing: 'easeOutExpo'},
    ],
    loop: true,
    
});


