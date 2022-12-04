class RatingManager {
    constructor() {
        const items = <NodeListOf<HTMLElement>>document.querySelectorAll(".js-rating");

        items.forEach((item: HTMLElement) => {
            const stars = parseInt(item.getAttribute("data-stars")) || 0;

            for (let i = 0; i < stars; i++) {
                const starEl = document.createElement("span");
                starEl.classList.add("rating__star");
                item.appendChild(starEl);
            }
        });
    }
}

export default new RatingManager();