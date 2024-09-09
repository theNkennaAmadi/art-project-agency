import gsap from 'gsap';

class MathUtils {
    static lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }

    static distance(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1);
    }
}

class MouseTracker {
    constructor(element) {
        this.element = element;
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.cacheMousePos = { x: 0, y: 0 };
        this.initEvents();
    }

    initEvents() {
        this.element.addEventListener('mousemove', ev => this.mousePos = this.getMousePos(ev));
    }

    getMousePos(ev) {
        const rect = this.element.getBoundingClientRect();
        return {
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top
        };
    }

    getMouseDistance() {
        return MathUtils.distance(this.mousePos.x, this.mousePos.y, this.lastMousePos.x, this.lastMousePos.y);
    }

    updateCacheMousePos() {
        this.cacheMousePos.x = MathUtils.lerp(this.cacheMousePos.x || this.mousePos.x, this.mousePos.x, 0.1);
        this.cacheMousePos.y = MathUtils.lerp(this.cacheMousePos.y || this.mousePos.y, this.mousePos.y, 0.1);
    }
}

class Image {
    constructor(el, containerRect) {
        this.DOM = { el: el };
        this.containerRect = containerRect;
        this.defaultStyle = {
            scale: 1,
            x: 0,
            y: 0,
            opacity: 0
        };
        this.getRect();
        this.initEvents();
    }

    initEvents() {
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        gsap.set(this.DOM.el, this.defaultStyle);
        this.getRect();
    }

    getRect() {
        const rect = this.DOM.el.getBoundingClientRect();
        this.rect = {
            top: rect.top - this.containerRect.top,
            left: rect.left - this.containerRect.left,
            width: rect.width,
            height: rect.height
        };
    }

    isActive() {
        return gsap.isTweening(this.DOM.el) || this.DOM.el.style.opacity != 0;
    }
}

export class ImageTrail {
    constructor() {
        this.DOM = { content: document.querySelector('.trail-list') };
        this.containerRect = this.DOM.content.getBoundingClientRect();
        this.images = [...this.DOM.content.querySelectorAll('.trail-item')].map(img => new Image(img, this.containerRect));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.threshold = 100;
        this.mouseTracker = new MouseTracker(this.DOM.content);
        this.render();
    }

    render() {
        const distance = this.mouseTracker.getMouseDistance();
        this.mouseTracker.updateCacheMousePos();

        if (distance > this.threshold) {
            this.showNextImage();
            ++this.zIndexVal;
            this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
            this.mouseTracker.lastMousePos = { ...this.mouseTracker.mousePos };
        }

        let isIdle = this.images.every(img => !img.isActive());
        if (isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }

        requestAnimationFrame(() => this.render());
    }

    showNextImage() {
        const img = this.images[this.imgPosition];
        gsap.killTweensOf(img.DOM.el);

        const timeline = gsap.timeline();

        timeline.set(img.DOM.el, {
            opacity: 1,
            scale: 1,
            zIndex: this.zIndexVal,
            x: this.mouseTracker.cacheMousePos.x - img.rect.width / 2,
            y: this.mouseTracker.cacheMousePos.y - img.rect.height / 2
        })
            .to(img.DOM.el, {
                duration: 0.9,
                ease: "expo.out",
                x: this.mouseTracker.mousePos.x - img.rect.width / 2,
                y: this.mouseTracker.mousePos.y - img.rect.height / 2
            }, 0)
            .to(img.DOM.el, {
                duration: 1,
                ease: "power1.out",
                opacity: 0
            }, 0.4)
            .to(img.DOM.el, {
                duration: 1,
                ease: "quint.out",
                scale: 0.2
            }, 0.4);
    }
}