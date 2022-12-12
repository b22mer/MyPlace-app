// 외부에서 사용할수 있도록 처리
export class Modal {

    constructor(contentId, fallbackText) {
        this.fallbackText = fallbackText;
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById("modal-template");
    }

    show() {
        if ('content' in document.createElement("template")) {
            const modalElements = document.importNode(this.modalTemplateEl.content, true);

            this.modalElement = modalElements.querySelector('.modal');
            this.backdropElement = modalElements.querySelector('.backdrop');

            const contentElement = document.importNode(
                this.contentTemplateEl.content,
                true
            );

            this.modalElement.appendChild(contentElement);
            document.body.insertAdjacentElement('afterbegin', this.modalElement)
            document.body.insertAdjacentElement('afterbegin', this.backdropElement)


        } else {
            // 템플릿이 지원되지 않는 상황에서 사용자에게 보여줌
            // fall back code
            alert(this.fallbackText);
        }

    }

    hide() {
        if (this.modalElement) {
            document.body.removeChild(this.modalElement);
            document.body.removeChild(this.backdropElement);
            //== this.modalElement.remove();
            this.modalElement = null;
            this.backdropElement = null;
        }
    }
}