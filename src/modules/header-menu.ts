import gsap from "gsap";
import header from "./header";
import { ScrollLocker } from "./utils";

type Tween = gsap.core.Tween;
type Timeline = gsap.core.Timeline;

class HeaderMenu {
    el: HTMLElement;
    buttonEl: HTMLElement;
    active: boolean;
    animation: Tween;
    buttonAnimation: Timeline;
    scrollLocker: ScrollLocker;

    static menuSelector = ".js-header-menu";
    static menuActiveClass = "header__menu_active";

    static buttonSelector = ".js-header-menu-button";

    constructor() {
        const el = <HTMLElement>document.querySelector(HeaderMenu.menuSelector);
        const buttonEl = <HTMLElement>(
            document.querySelector(HeaderMenu.buttonSelector)
        );

        buttonEl.addEventListener("click", () => this.toggle());

        this.el = el;
        this.active = false;
        this.scrollLocker = new ScrollLocker((ev: Event) => this.active);

        const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
            this.animation = gsap.fromTo(
                el,
                {
                    yPercent: 100,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    opacity: 1,

                    duration: 0.4,

                    paused: true,

                    onStart: () =>
                        this.el.classList.add(HeaderMenu.menuActiveClass),

                    onReverseComplete: () =>
                        this.el.classList.remove(HeaderMenu.menuActiveClass),
                }
            );

            this.buttonAnimation = gsap
                .timeline({
                    paused: true,
                    defaults: {
                        transformOrigin: "center",
                        duration: 0.5,
                        ease: "none",
                    },
                })
                .to(buttonEl, {
                    rotateZ: -180,
                    duration: 0.4,
                })
                .to(".header__burger-top", { top: "50%", yPercent: -50 }, 0)
                .to(
                    ".header__burger-bottom",
                    { bottom: "50%", yPercent: 50 },
                    0
                )
                .to(".header__burger-middle", { opacity: 0 }, 0)
                .to(".header__burger-top", { rotateZ: -45 }, 0)
                .to(".header__burger-bottom", { rotateZ: 45 }, 0);
        });
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
        this.buttonAnimation.play();
        header.bgAnim.play();

        this.active = true;
    }

    close(): void {
        if (!this.active) return;

        this.animation.reverse();
        this.buttonAnimation.reverse();
        header.bgAnim.pause();

        this.active = false;
    }

    toggle(open: boolean = !this.active): void {
        open ? this.open() : this.close();
    }
}

export default new HeaderMenu();
