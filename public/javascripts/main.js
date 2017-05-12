window.onload = function () {
    var mySwiper1 = new Swiper('#topic-header', {
        freeMode: true,
        slidesPerView: 'auto',
    });
    var nav = document.querySelector('#nav');
    var toggle = document.querySelector('#navbar-toggle');
    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!nav.style.display || nav.style.display === 'none') {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
        }
    });

    document.addEventListener('click',function () {
        if (nav.style.display === 'block'){
            nav.style.display = 'none'
        }
    })
};