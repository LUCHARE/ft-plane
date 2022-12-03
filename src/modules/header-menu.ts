import gsap from "gsap";
import header from "./header";

type Tween = gsap.core.Tween;
type Timeline = gsap.core.Timeline;

class HeaderMenu {
    el: HTMLElement;
    buttonEl: HTMLElement;
    active: boolean;
    animation: Tween;

    static menuSelector = ".js-header-menu";
    static menuActiveClass = "header__menu_active";

    static buttonSelector = ".js-header-menu-button";

    constructor() {
        const el = <HTMLElement>document.querySelector(HeaderMenu.menuSelector);
        const buttonEl = <HTMLElement>document.querySelector(HeaderMenu.buttonSelector);

        buttonEl.addEventListener("click", () => this.toggle());

        this.el = el;
        this.active = false;

        this.animation = gsap.fromTo(
            el,
            {
                yPercent: 100,
                opacity: 0
            },
            {
                yPercent: 0,
                opacity: 1,

                duration: 0.4,

                paused: true,

                onStart: () => this.el.classList.add(HeaderMenu.menuActiveClass),

                onReverseComplete: () => this.el.classList.remove(HeaderMenu.menuActiveClass)
            }
        );
    }

    updatePosAndSize(): void {
        const headerHeight = header.getHeight();

        this.el.style.height = `calc(100vh - ${headerHeight}px)`;
        this.el.style.top = `${headerHeight}px`;
    }

    open(): void {
        if (this.active) return;

        this.updatePosAndSize();

        this.animation.play();
        header.bgAnim.play();

        this.active = true;
    }

    close(): void {
        if (!this.active) return;

        this.animation.reverse();
        header.bgAnim.pause();

        this.active = false;
    }

    toggle(open: boolean = !this.active): void {
        open ? this.open() : this.close();
    }
}

export default new HeaderMenu();
