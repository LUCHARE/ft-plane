import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type Tween = gsap.core.Tween;

gsap.registerPlugin(ScrollTrigger);

class Header {
    el: Element;
    bgAnim: Tween;

    constructor() {
        const el = <Element>document.querySelector(".js-header");

        this.el = el;

        this.bgAnim = gsap.fromTo(
            el,
            { background: "rgba(1, 2, 35, 0.0)" },
            {
                background: "rgba(1, 2, 35, 0.9)",
                scrollTrigger: {
                    trigger: el,
                    start: 0,
                    end: this.getHeight(),
                    scrub: true,
                },
                duration: 0.4,
            }
        );
    }

    getHeight(): number {
        return this.el.clientHeight;
    }
}

export default new Header();
