class BookFormClass {
    el: HTMLInputElement;
    labelEl: HTMLLabelElement;

    private static activeEl: HTMLLabelElement;
    private static activeClass: string = "book__form-class_active";

    constructor(el: HTMLInputElement, labelEl: HTMLLabelElement) {
        if (el.checked) {
            labelEl.classList.add(BookFormClass.activeClass);
            BookFormClass.activeEl = labelEl;
        }

        el.addEventListener("change", (event: Event) => {
            if (BookFormClass.activeEl)
                BookFormClass.activeEl.classList.remove(
                    BookFormClass.activeClass
                );

            labelEl.classList.add(BookFormClass.activeClass);

            BookFormClass.activeEl = labelEl;
        });

        this.el = el;
        this.labelEl = labelEl;
    }
}

class BookFormButton {
    el: HTMLElement;

    constructor(el: HTMLElement) {
        el.addEventListener("click", (event: Event) => {
            event.preventDefault();
        });

        this.el = el;
    }
}

class BookForm {
    el: HTMLElement;
    buttons: Array<BookFormButton>;
    classes: Array<BookFormClass>;

    constructor() {
        const el = <HTMLElement>document.querySelector(".js-book-form");
        const buttons = <NodeListOf<HTMLElement>>(
            document.querySelectorAll(".js-book-form-button")
        );
        const classes = <NodeListOf<HTMLLabelElement>>(
            document.querySelectorAll(".js-book-class")
        );

        this.buttons = [];
        this.classes = [];

        buttons.forEach((buttonEl: HTMLElement) =>
            this.buttons.push(new BookFormButton(buttonEl))
        );
        classes.forEach((classEl: HTMLLabelElement) =>
            this.classes.push(
                new BookFormClass(classEl.querySelector("input"), classEl)
            )
        );

        this.el = el;
    }
}

export default new BookForm();
