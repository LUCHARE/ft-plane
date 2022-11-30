import "./styles/index.scss";

new Swiper(".popular-tickets__card-slider", {
    effect: "cards",
    cardsEffect: {
        rotate: false,
        slideShadows: false,
        perSlideOffset: 10,
    },
    pagination: {
        el: ".popular-tickets__card-slider-pagination",
        bulletClass: "popular-tickets__card-slider-pagination-bullet",
        bulletActiveClass: "popular-tickets__card-slider-pagination-bullet-active",
        clickable: true,
    },
    navigation: {
        nextEl: ".popular-tickets__card-slider-next",
        prevEl: ".popular-tickets__card-slider-prev"
    }
});

new Swiper(".feedback__slider", {
    spaceBetween: 32,
    navigation: {
        nextEl: ".feedback__slider-next",
        prevEl: ".feedback__slider-prev"
    }
});
