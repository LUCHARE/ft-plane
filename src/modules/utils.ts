type ScrollLockerCallback = (ev: Event) => boolean;
type ScrollLockerListener = (ev: Event) => void;

class ScrollLocker {
    private callback: ScrollLockerCallback;
    private listener: ScrollLockerListener;
    private scrollingEl: Element;
    private attached: boolean;

    private static events: Array<string> = ["touchmove", "wheel"];
    private static listenerOptions: AddEventListenerOptions = {
        passive: false,
    };

    constructor(callback?: ScrollLockerCallback) {
        if (!callback) return;

        this.attach(callback);
    }

    private createListener() {
        this.listener = (ev: Event): void => {
            if (this.callback(ev)) {
                ev.preventDefault();
            }
        };
    }

    private attachListener() {
        if (!this.callback) return;

        if (!this.listener) this.createListener();

        if (!this.scrollingEl) this.scrollingEl = document.scrollingElement;

        ScrollLocker.events.forEach((eventName: string) => {
            this.scrollingEl.addEventListener(
                eventName,
                this.listener,
                ScrollLocker.listenerOptions
            );
        });

        this.attached = true;
    }

    private detachListener() {
        if (!this.attached) return;

        if (!this.listener) return;

        ScrollLocker.events.forEach((eventName: string) => {
            this.scrollingEl.removeEventListener(
                eventName,
                this.listener,
                ScrollLocker.listenerOptions
            );
        });

        this.attached = false;
    }

    public attach(callback?: ScrollLockerCallback) {
        if (!callback && this.attached) return;
        if (callback && this.attached) this.detachListener();

        this.callback = callback;
        this.attachListener();
    }

    public detach() {
        this.detachListener();
    }
}

export { ScrollLocker, ScrollLockerCallback };
