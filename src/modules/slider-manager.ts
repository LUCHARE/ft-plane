import Swiper, { Pagination, Navigation, EffectCards } from "swiper";

class SliderManager {
    popularTickets: Swiper;
    feedback: Swiper;

    constructor() {
        this.initPopularTickets();
        this.initFeedback();
    }

    initPopularTickets(): void {
        this.popularTickets = new Swiper(".popular-tickets__card-slider", {
            modules: [Navigation, Pagination],//, EffectCards],
            // effect: "cards",
            // cardsEffect: {
            //     rotate: false,
            //     slideShadows: false,
            //     perSlideOffset: 10,
            // },
            spaceBetween: 32,
            pagination: {
                el: ".popular-tickets__card-slider-pagination",
                bulletClass: "popular-tickets__card-slider-pagination-bullet",
                bulletActiveClass:
                    "popular-tickets__card-slider-pagination-bullet-active",
                clickable: true,
            },
            navigation: {
                nextEl: ".popular-tickets__card-slider-next",
                prevEl: ".popular-tickets__card-slider-prev",
            },
        });
    }

    initFeedback(): void {
        this.feedback = new Swiper(".feedback__slider", {
            modules: [Navigation, Pagination],
            spaceBetween: 32,
            navigation: {
                nextEl: ".feedback__slider-next",
                prevEl: ".feedback__slider-prev",
            },
        });
    }
}

export default new SliderManager();
