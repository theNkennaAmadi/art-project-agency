import gsap from "gsap";

export class Contact{
    constructor(container) {
        this.container = container
        this.init()
    }
    init(){
        gsap.to('.main', {opacity:1})
        UnicornStudio.addScene({
            elementId: "unicorn", // id of the HTML element to render your scene in (the scene will use its dimensions)
            fps: 60, // frames per second (0-120) [optional]
            scale: 1, // rendering scale, use smaller values for performance boost (0.25-1) [optional]
            dpi: 1, // pixel ratio [optional]
            projectId: "NTQIO0RnA2PWpch8d9Sb?production=true", // the id string for your embed (get this from "embed" export)
            lazyLoad: true, // will not initialize the scene until it scrolls into view
            filePath: "https://cdn.shopify.com/s/files/1/0650/2826/0015/files/NTQIO0RnA2PWpch8d9Sb.json?v=1725532061", // if youre hosting your own exported json code, point to it here (do not use both filePath and projectId, only one is required)
            production: false, // when true, will hit the global edge CDN, learn more in the help docs
            interactivity: {
                // [optional]
                mouse: {
                    disableMobile: true, // disable touch movement on mobile
                },
            },
        })
            .then((scene) => {
                // scene is ready
                // To remove a scene, you can use:
                // scene.destroy()
                this.container.querySelector('canvas').removeAttribute('role')
            })
            .catch((err) => {
                console.error(err);
            });
    }
}