import sliderManager from "./slider-manager";

class FeedbackMap {
    constructor() {
        const mapEl = <HTMLElement>document.querySelector(".js-feedback-map");
        const users = <NodeListOf<HTMLElement>>(
            document.querySelectorAll(".js-feedback-user")
        );

        users.forEach((userEl: HTMLElement) => {
            const randomWidth = 40 + Math.random() * 10;
            const randomX = 20 + 50 * Math.random();
            const randomY = 20 + 50 * Math.random();

            userEl.style.width = `${randomWidth}px`;
            userEl.style.left = `${randomX}%`;
            userEl.style.top = `${randomY}%`;

            userEl.addEventListener("click", (ev: Event) => {
                const cardId = parseInt(userEl.getAttribute("data-card-id"));

                if (!isFinite(cardId)) return;

                const slides = <NodeListOf<HTMLElement>>(
                    document.querySelectorAll(".feedback__card")
                );

                slides.forEach((slideEl: HTMLElement, index: number) => {
                    const id = parseInt(slideEl.getAttribute("data-id"));
                    if (id == cardId) {
                        sliderManager.feedback.slideTo(index);
                    }
                });

                // TODO
            });
        });
    }
}

export default new FeedbackMap();
