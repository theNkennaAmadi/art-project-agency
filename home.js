import gsap from 'gsap'
import Splitting from 'splitting'
import Swiper from 'swiper/bundle';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


const mmHome = gsap.matchMedia();

export class Home2 {
    constructor(container, lenis) {

        this.container = container
        this.lenis = lenis

        lenis.scrollTo(0, { immediate: true })
        //lenis.stop()

        this.init()
        this.footer = this.container.querySelector('.footer')
        this.nav = this.container.querySelector('.nav')


        this.heroSection()
        this.about()
        this.clientsMarquee()
        this.wwd()
        this.initLinkHovers()
        this.init3D()
        this.activeIndex = 0
    }

    init() {
        gsap.to('.main', {opacity:1})
        UnicornStudio.addScene({
            elementId: "homeGl", // id of the HTML element to render your scene in (the scene will use its dimensions)
            fps: 60, // frames per second (0-120) [optional]
            scale: 1, // rendering scale, use smaller values for performance boost (0.25-1) [optional]
            dpi: 1, // pixel ratio [optional]
            projectId: "3EJV0eCCE5mFcRITvNdm", // the id string for your embed (get this from "embed" export)
            lazyLoad: true, // will not initialize the scene until it scrolls into view
            filePath: "https://cdn.shopify.com/s/files/1/0650/2826/0015/files/3EJV0eCCE5mFcRITvNdm.json?v=1725876581", // if youre hosting your own exported json code, point to it here (do not use both filePath and projectId, only one is required)
            altText: "Art Project Agency", // optional text for SEO, going inside the <canvas> tag
            ariaLabel: "This is a canvas scene", // optional text for the aria-label attribute on the <canvas> element
            production: false, // when true, will hit the global edge CDN, learn more in the help docs
            interactivity: {
                // [optional]

                mouse: {
                    disableMobile: true, // disable touch movement on mobile
                },
            },
        })
            .then((scene) => {
                //console.log(scene)
                // scene is ready
                // To remove a scene, you can use:
                // scene.destroy()
            })
            .catch((err) => {
                console.error(err);
            });

        const swiper = new Swiper(".swiper", {
            speed: 1000,
            loop: true,
            navigation: {
                nextEl: ".sl-next",
                prevEl: ".sl-prev",
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
        });
    }



    heroSection() {
        const centerX = -1.5
        const centerY = -2.5

        const heroText = this.container.querySelectorAll('.home-hero-text')
        const result = Splitting({
            target: heroText,
            by: 'chars',
        })

        const result2= Splitting({
            target: '.w1',
            by: 'chars',
        })

        const result3= Splitting({
            target: '[s-link]',
            by: 'chars',
        })

        gsap.set(result[0].chars, {
            autoAlpha: 0,
        })

        gsap
            .timeline({
                onComplete: () => {
                    this.lenis.start()
                },
            })
            .to('.home-hero-svg', {
                scale: 150,
                xPercent: -centerX * 150,
                yPercent: -centerY * 150,
                ease: 'expo.inOut',
                delay: 0.5,
                duration: 1.75,
            })
            .to(
                '.home-hero-svg',
                {
                    autoAlpha: 0,
                },
                '-=.3'
            )
            .to(
                ['.home-hero-btn', '.home-scroll-indicator'],
                {
                    autoAlpha: 1,
                },
                '-=.5'
            )
            .to(result[0].chars, {
                autoAlpha: 1,
                stagger: 0.03,
                duration: 0.5,
            })

        const videoBtn = document.querySelector('.home-hero-btn')
        const video = document.querySelector('.hh-embed video')

        this.isPlaying = false
        videoBtn.addEventListener('click', () => {
            if (!this.isPlaying) {
                gsap
                    .timeline({
                        onStart: () => {
                            video.currentTime = 0
                            video.muted = false
                            this.isPlaying = true
                        },
                    })
                    .to(result[0].chars, {
                        autoAlpha: 0,
                        stagger: { each: 0.05, from: 'end' },
                        duration: 0.5,
                    })
                    .to('.home-hero-btn', {
                        autoAlpha: 0,
                        duration: 0.5,
                    })
                gsap.to(this.container.querySelector('.cursor'), { scale: 1, duration: 0.5, ease: 'power2.out' });
            }
        })
        video.addEventListener('click', () => {
            if (this.isPlaying) {
                gsap
                    .timeline({
                        onStart: () => {
                            video.currentTime = 0
                            video.muted = true
                            this.isPlaying = false
                        },
                    })
                    .to('.home-hero-btn', {
                        autoAlpha: 1,
                        duration: 0.5,
                    })
                    .to(result[0].chars, {
                        autoAlpha: 1,
                        stagger: { each: 0.05, from: 'start' },
                        duration: 0.5,
                    })
                gsap.to(this.container.querySelector('.cursor'), { scale: 0, duration: 0.5, ease: 'power2.out' });
            }
        })

        gsap.set('.w1 .char', {yPercent: 110})

        const w1 = this.container.querySelectorAll('.w1')

        const riskFirst = this.container.querySelectorAll('.risk .char:not(:last-child)');
        const storyChars = this.container.querySelectorAll('.story .char');

        w1.forEach((element, index) => {
            gsap.fromTo(element.querySelectorAll('.char'), {yPercent: 110}, {yPercent: 0, duration: 1, stagger: 0.1, scrollTrigger:{
                    trigger: '.wa-text-wrapper',
                    start: 'center 100%',
                    end: 'center 70%',
                    scrub: true,
                    //markers: true
                }})
        })

        gsap.set(storyChars, {opacity: 0})
        gsap.set('.story', {opacity: 1})

        let tlA = gsap.timeline({scrollTrigger: {
                trigger: '.secondary-mask-wrapper',
                start: ()=> window.innerWidth > 767 ? 'bottom 100%' : 'bottom 70%',
                end: ()=> window.innerWidth > 767 ? 'bottom 95%' : 'bottom 30%',
                scrub: 1,
                //markers: true,
            }})


        tlA.to('.risk', {xPercent: -96.5}, "<")
            .to(riskFirst, {yPercent: 110, stagger: {from: 'end'}},"<")
            .to('.story', {xPercent: -86.5}, "<")
            .to(storyChars, {opacity: 1, stagger: {from: 'start'}},"<")


        mmHome.add("(min-width: 768px)", () => {
            gsap.to('.secondary-mask-wrapper', {
                opacity: 1,
                scrollTrigger: {
                    trigger: '.secondary-mask-wrapper',
                    start: 'top 80%',
                    end: 'top top',
                    scrub: true,
                    // markers: true
                },
            });
        })



        mmHome.add("(max-width: 767px)", () => {
            gsap.to('.secondary-mask-wrapper', {
                opacity: 1,
                scrollTrigger: {
                    trigger: '.secondary-mask-wrapper',
                    start: 'top top',
                    end: '30% top',
                    scrub: true,
                    // markers: true
                },
            });
        })



        gsap.to('.gl-section', {opacity: 0.1, scrollTrigger:{
                trigger: '.gl-section',
                start: 'bottom bottom',
                end: 'bottom 50%',
                scrub: 2,
                //markers: true
            }})

        gsap.to('.home-hero', {
            opacity: 0,
            scrollTrigger:{
                trigger: '.home-about',
                start: 'bottom bottom',
                scrub: 1,
            }
        })

    }

    about() {
        const aboutText = this.container.querySelectorAll('.ha-p')
        const result = Splitting({
            target: aboutText,
            by: 'words',
        })

        gsap.set(result[0].words, {
            opacity: 0.4,
        })

        gsap.to(result[0].words, {
            opacity: 1,
            ease: 'none',
            stagger: 0.5,
            scrollTrigger: {
                trigger: aboutText,
                scrub: 1,
                start: 'top 100%',
                end: 'top 30%',
            },
        })
    }

    wwd() {
        const wwI = gsap.utils.toArray(this.container.querySelectorAll('.home-wwd-i-c'))
        const wwT = [...this.container.querySelectorAll('.home-wwd-r-item')]

        mmHome.add("(min-width: 767px)", () => {
            wwT.forEach((element, index) => {
                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: element,
                            scrub: true,
                            start: 'top 60%',
                            end: 'top 45%',
                        },
                    })
                    .fromTo(wwI[index],{clipPath: 'inset(0% 0% 100% 0%)',}, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 3,
                        ease: 'power3.out',
                    })
                    .to(wwT[index], {opacity:1, duration:1})
            })

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const index = wwT.indexOf(entry.target);
                        if (entry.isIntersecting) {
                            if(window.innerWidth > 767){
                                this.changeObject(index); // Call the changeObject method
                            }
                        }
                    });
                },
                {
                    root: null, // Use the viewport as the root
                    rootMargin: '0px 0px -40% 0px', // Adjust this to fine-tune when animations should trigger
                    threshold: 0.6, // 60% of the element should be visible
                }
            );

            // Observe each element in wwT
            wwT.forEach((element) => {
                observer.observe(element);
            });

        })

    }

    clientsMarquee() {
        gsap.utils.toArray('.cl-marquee').forEach((item, i) => {
            const parent = document.querySelector('.hm-clientelle')
            const child = item

            const scrollDistance = -(child.scrollHeight - parent.clientHeight)

            gsap.set(child, {
                y: i % 2 === 0 ? 0 : scrollDistance,
            })

            gsap.to(child, {
                y: i % 2 === 0 ? scrollDistance : 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: parent,
                    start: 'top 80%',
                    end: 'bottom 70%',
                    scrub: 2,
                },
            })
        })
    }

    initLinkHovers(){
        const links = this.container.querySelectorAll('[s-link]');
        links.forEach(link => {
            const linkText = link.querySelectorAll('.char')
            const tllink = gsap.timeline({paused: true});
            tllink.fromTo(linkText, {yPercent: 0},{yPercent: -100, duration: 0.8, ease: 'power4.out', stagger: {amount: 0.1}});
            link.addEventListener('mouseover', () => {
                tllink.timeScale(1)
                tllink.play()
            });

            link.addEventListener('mouseout', () => {
                tllink.timeScale(1.5)
                tllink.reverse()
            });
        });
    }

    init3D() {
        // Base setup
        const canvas = this.container.querySelector(".webgl1");
        const canvasContainer = canvas.parentElement;
        const scene = new THREE.Scene();

        const mobCanvas = [...this.container.querySelectorAll('.webgl2')];
        const mobCanvasContainer = mobCanvas.map(canvas => canvas.parentElement);
        const mobScenes = mobCanvas.map(() => new THREE.Scene());
        const mobRenderers = [];
        const mobComposers = [];
        const mobCameras = [];
        const mobControls = [];

        // State management for morphing
        let currentActiveIndex = 0;
        let prevActiveIndex = 0;
        const morphDuration = 800;
        let morphStartTime = null;
        let fromPoints = null;
        let toPoints = null;
        let currentProgress = 0;

        // Precompute all point sets
        const earthData = createEarthPoints();
        const earthPoints = earthData.points;
        const landFlags = earthData.landFlags;

        const lightbulbData = createLightbulbPoints();
        const lightbulbPoints = lightbulbData.points;
        const pointTypes = lightbulbData.pointTypes;

        const diamondPoints = createFacetPoints();
        const letterPoints = createLetterPoints();

        // Ensure arrays have same length
        const numPoints = diamondPoints.length;
        adjustPointsAndFlags(letterPoints, [], numPoints);
        adjustPointsAndFlags(earthPoints, landFlags, numPoints);
        adjustPointsAndFlags(lightbulbPoints, pointTypes, numPoints);

        // Create base geometry and materials
        const geometry = new THREE.BufferGeometry().setFromPoints(diamondPoints);
        const colors = new Float32Array(numPoints * 3);
        for (let i = 0; i < colors.length; i += 3) {
            colors[i] = 0.0;     // R
            colors[i + 1] = 1.0; // G
            colors[i + 2] = 1.0; // B
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.015,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const letterMaterial = new THREE.PointsMaterial({
            size: 0.005,
            vertexColors: true,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        // Main desktop scene setup
        const diamond = new THREE.Points(geometry, material);
        scene.add(diamond);

        const lightSource = createLightSource();
        const numRays = 700;
        const numVertices = geometry.attributes.position.count;
        const lightRays = createLightRays(numRays, numVertices);
        scene.add(lightSource);
        scene.add(lightRays);

        // Sizes setup for main canvas
        const sizes = {
            width: canvasContainer.clientWidth,
            height: canvasContainer.clientHeight,
        };

        // Main camera setup
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(0, 0, 2.5);
        scene.add(camera);

        // Main controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.y = 0;
        controls.enableDamping = true;
        controls.enableZoom = false;

        // Main renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Main post-processing setup
        const renderScene = new RenderPass(scene, camera);
        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(sizes.width, sizes.height),
            1.5,
            0.4,
            0.85
        );
        composer.addPass(bloomPass);

        // Setup for mobile canvases
        const mobileObjects = [];
        const mobilePoints = [diamondPoints, earthPoints, lightbulbPoints, letterPoints];
        const mobileMaterials = [material, material, material, letterMaterial];

        // Initialize each mobile canvas
        mobCanvas.forEach((canvas, index) => {
            // Create renderer
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
            });
            renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
            renderer.setSize(mobCanvasContainer[index].clientWidth, mobCanvasContainer[index].clientHeight);
            renderer.setClearColor(0x000000);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            mobRenderers.push(renderer);

            // Create camera
            const camera = new THREE.PerspectiveCamera(
                75,
                mobCanvasContainer[index].clientWidth / mobCanvasContainer[index].clientHeight,
                0.1,
                100
            );
            camera.position.set(0, 0, 2.5);
            mobCameras.push(camera);
            mobScenes[index].add(camera);

            // Create controls
            const controls = new OrbitControls(camera, canvas);
            controls.target.y = 0;
            controls.enableDamping = true;
            controls.enableZoom = false;
            mobControls.push(controls);

            // Create post-processing
            const renderScene = new RenderPass(mobScenes[index], camera);
            const composer = new EffectComposer(renderer);
            composer.addPass(renderScene);

            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(mobCanvasContainer[index].clientWidth, mobCanvasContainer[index].clientHeight),
                1.5,
                0.4,
                0.85
            );
            composer.addPass(bloomPass);
            mobComposers.push(composer);

            // Create object for this canvas
            const newGeometry = geometry.clone();
            const newObject = new THREE.Points(newGeometry, mobileMaterials[index]);

            // Set initial points and colors
            const positions = newGeometry.attributes.position;
            const colors = newGeometry.attributes.color;

            for (let i = 0; i < numPoints; i++) {
                const i3 = i * 3;
                positions.array[i3] = mobilePoints[index][i].x;
                positions.array[i3 + 1] = mobilePoints[index][i].y;
                positions.array[i3 + 2] = mobilePoints[index][i].z;

                // Set appropriate colors based on object type
                if (index === 1) { // Earth
                    const isLand = landFlags[i];
                    colors.array[i3] = 0.0;
                    colors.array[i3 + 1] = isLand ? 1.0 : 0.0;
                    colors.array[i3 + 2] = isLand ? 1.0 : 0.0;
                } else if (index === 2) { // Lightbulb
                    const type = pointTypes[i];
                    if (type === 0) { // bulb
                        colors.array[i3] = 1.0;
                        colors.array[i3 + 1] = 1.0;
                        colors.array[i3 + 2] = 0.0;
                    } else if (type === 1) { // base
                        colors.array[i3] = 0.5;
                        colors.array[i3 + 1] = 0.5;
                        colors.array[i3 + 2] = 0.5;
                    } else { // glow
                        colors.array[i3] = 1.0;
                        colors.array[i3 + 1] = 1.0;
                        colors.array[i3 + 2] = 1.0;
                    }
                } else { // Diamond and Letters
                    colors.array[i3] = 0.0;
                    colors.array[i3 + 1] = 1.0;
                    colors.array[i3 + 2] = 1.0;
                }
            }

            positions.needsUpdate = true;
            colors.needsUpdate = true;

            mobScenes[index].add(newObject);
            mobileObjects.push(newObject);
        });

        // Global resize handler
        window.addEventListener("resize", () => {
            // Main canvas resize
            sizes.width = canvasContainer.clientWidth;
            sizes.height = canvasContainer.clientHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            composer.setSize(sizes.width, sizes.height);

            // Mobile canvases resize
            mobCanvas.forEach((_, index) => {
                const width = mobCanvasContainer[index].clientWidth;
                const height = mobCanvasContainer[index].clientHeight;
                mobCameras[index].aspect = width / height;
                mobCameras[index].updateProjectionMatrix();
                mobRenderers[index].setSize(width, height);
                mobRenderers[index].setPixelRatio(Math.min(window.devicePixelRatio, 2));
                mobComposers[index].setSize(width, height);
            });
        });

        // Initialize morphing points
        fromPoints = diamondPoints;
        toPoints = diamondPoints;

        // Method to change active object
        this.changeObject = (index) => {
            if (currentActiveIndex !== index) {
                if (morphStartTime !== null && currentProgress < 1) {
                    for (let i = 0; i < numPoints; i++) {
                        fromPoints[i].copy(toPoints[i]);
                    }
                }

                prevActiveIndex = currentActiveIndex;
                currentActiveIndex = index;
                morphStartTime = null;

                const pointSets = [diamondPoints, earthPoints, lightbulbPoints, letterPoints];
                fromPoints = pointSets[prevActiveIndex].map(p => p.clone());
                toPoints = pointSets[currentActiveIndex];
            }
        };

        // Animation loop
        const tick = () => {
            const elapsedTime = Date.now();

            if (morphStartTime === null) {
                morphStartTime = elapsedTime;
            }

            const elapsed = elapsedTime - morphStartTime;
            currentProgress = Math.min(elapsed / morphDuration, 1);

            // Check viewport width once at the start of tick
            const isDesktop = window.innerWidth > 767;

            if (isDesktop) {
                // Desktop-only updates
                updateMainScene();
                updateLightRays();

                // Rotate desktop diamond
                diamond.rotation.y += 0.001;
                lightRays.rotation.y = diamond.rotation.y;

                // Update desktop controls and render
                controls.update();
                composer.render();
            } else {
                // Mobile-only updates
                mobileObjects.forEach((obj) => {
                    obj.rotation.y += 0.001;
                });

                // Update mobile controls and render
                mobControls.forEach((control, index) => {
                    control.update();
                    mobComposers[index].render();
                });
            }

            window.requestAnimationFrame(tick);
        };

        // Helper function to update main scene positions and colors
        const updateMainScene = () => {
            const positionAttribute = geometry.attributes.position;
            const colorAttribute = geometry.attributes.color;
            const displayIndex = currentProgress < 1 ? prevActiveIndex : currentActiveIndex;

            for (let i = 0; i < numPoints; i++) {
                const i3 = i * 3;

                const point = new THREE.Vector3();
                point.lerpVectors(fromPoints[i], toPoints[i], currentProgress);

                positionAttribute.array[i3] = point.x;
                positionAttribute.array[i3 + 1] = point.y;
                positionAttribute.array[i3 + 2] = point.z;

                // Color updates with smoother transitions
                let targetColors;
                switch(displayIndex) {
                    case 0: // Diamond
                        targetColors = [0.0, 1.0, 1.0];
                        diamond.material = material;
                        break;
                    case 1: // Earth
                        const isLand = landFlags[i];
                        targetColors = isLand ? [0.0, 1.0, 1.0] : [0.0, 0.0, 0.0];
                        diamond.material = material;
                        break;
                    case 2: // Lightbulb
                        const type = pointTypes[i];
                        if (type === 0) targetColors = [1.0, 1.0, 0.0];
                        else if (type === 1) targetColors = [0.5, 0.5, 0.5];
                        else targetColors = [1.0, 1.0, 1.0];
                        diamond.material = material;
                        break;
                    case 3: // Letters
                        targetColors = [0.0, 1.0, 1.0];
                        diamond.material = letterMaterial;
                        break;
                }

                for (let j = 0; j < 3; j++) {
                    const currentColor = colorAttribute.array[i3 + j];
                    colorAttribute.array[i3 + j] = THREE.MathUtils.lerp(
                        currentColor,
                        targetColors[j],
                        currentProgress * 0.1
                    );
                }
            }

            positionAttribute.needsUpdate = true;
            colorAttribute.needsUpdate = true;
        };

        // Helper function to update light rays
        const updateLightRays = () => {
            const rayPositions = lightRays.geometry.attributes.position.array;
            const currentPositions = geometry.attributes.position.array;
            const indices = lightRays.userData.indices;

            for (let i = 0; i < numRays; i++) {
                const idx = i * 6;
                const vertexIndex = indices[i] * 3;

                const endPoint = new THREE.Vector3(
                    currentPositions[vertexIndex],
                    currentPositions[vertexIndex + 1],
                    currentPositions[vertexIndex + 2]
                );

                endPoint.applyAxisAngle(new THREE.Vector3(0, 1, 0), diamond.rotation.y);

                rayPositions[idx + 3] = THREE.MathUtils.lerp(rayPositions[idx + 3], endPoint.x, 0.1);
                rayPositions[idx + 4] = THREE.MathUtils.lerp(rayPositions[idx + 4], endPoint.y, 0.1);
                rayPositions[idx + 5] = THREE.MathUtils.lerp(rayPositions[idx + 5], endPoint.z, 0.1);
            }

            lightRays.geometry.attributes.position.needsUpdate = true;
        };

        tick();
    }
}

// Function to create Earth points
function createEarthPoints() {
    const points = [];
    const landFlags = [];
    const numPoints = 20000;
    const radius = 1;

    for (let i = 0; i < numPoints; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const lat = 90 - (phi * 180) / Math.PI; // Latitude in degrees
        const lon = (theta * 180) / Math.PI - 180; // Longitude in degrees

        let isLand = false;

        // Simple approximations for continents
        if (
            // North America
            (lat > 15 && lat < 70 && lon > -130 && lon < -60) ||
            // South America
            (lat > -60 && lat < 15 && lon > -80 && lon < -30) ||
            // Africa
            (lat > -35 && lat < 35 && lon > -20 && lon < 50) ||
            // Europe
            (lat > 35 && lat < 70 && lon > -10 && lon < 40) ||
            // Asia
            (lat > 5 && lat < 70 && lon > 40 && lon < 180) ||
            // Australia
            (lat > -50 && lat < -10 && lon > 110 && lon < 160)
        ) {
            isLand = true;
        }

        points.push(new THREE.Vector3(x, y, z));
        landFlags.push(isLand);
    }

    return { points, landFlags };
}

// Function to create diamond facet points
function createFacetPoints() {
    const points = [];
    const tableSize = 0.6;
    const crownHeight = 0.45;
    const pavilionHeight = 1;
    const girthRadius = 1;

    function createFacet(vertices, density) {
        for (let i = 0; i < density; i++) {
            const a = Math.random();
            const b = Math.random();
            if (a + b > 1) continue;
            const c = 1 - a - b;

            const point = new THREE.Vector3(
                vertices[0].x * a + vertices[1].x * b + vertices[2].x * c,
                vertices[0].y * a + vertices[1].y * b + vertices[2].y * c,
                vertices[0].z * a + vertices[1].z * b + vertices[2].z * c
            );
            points.push(point);
        }
    }

    // Table
    const tableSegments = 12;
    for (let i = 0; i < tableSegments; i++) {
        const angle1 = (i / tableSegments) * Math.PI * 2;
        const angle2 = ((i + 1) / tableSegments) * Math.PI * 2;
        const v1 = new THREE.Vector3(Math.cos(angle1) * tableSize, crownHeight, Math.sin(angle1) * tableSize);
        const v2 = new THREE.Vector3(Math.cos(angle2) * tableSize, crownHeight, Math.sin(angle2) * tableSize);
        const v3 = new THREE.Vector3(0, crownHeight, 0);
        createFacet([v1, v2, v3], 200);
    }

    // Crown facets
    for (let i = 0; i < 12; i++) {
        const angle1 = (i / 12) * Math.PI * 2;
        const angle2 = ((i + 1) / 12) * Math.PI * 2;
        const midAngle = (angle1 + angle2) / 2;

        const v1 = new THREE.Vector3(Math.cos(angle1) * tableSize, crownHeight, Math.sin(angle1) * tableSize);
        const v2 = new THREE.Vector3(Math.cos(angle2) * tableSize, crownHeight, Math.sin(angle2) * tableSize);
        const v3 = new THREE.Vector3(Math.cos(midAngle) * girthRadius, 0, Math.sin(midAngle) * girthRadius);
        const v4 = new THREE.Vector3(Math.cos(angle1) * girthRadius, 0, Math.sin(angle1) * girthRadius);
        const v5 = new THREE.Vector3(Math.cos(angle2) * girthRadius, 0, Math.sin(angle2) * girthRadius);

        createFacet([v1, v3, v4], 300);
        createFacet([v2, v3, v5], 300);
        createFacet([v1, v2, v3], 300);
    }

    // Pavilion facets
    for (let i = 0; i < 12; i++) {
        const angle1 = (i / 12) * Math.PI * 2;
        const angle2 = ((i + 1) / 12) * Math.PI * 2;

        const v1 = new THREE.Vector3(Math.cos(angle1) * girthRadius, 0, Math.sin(angle1) * girthRadius);
        const v2 = new THREE.Vector3(Math.cos(angle2) * girthRadius, 0, Math.sin(angle2) * girthRadius);
        const v3 = new THREE.Vector3(0, -pavilionHeight, 0);
        createFacet([v1, v2, v3], 300);
    }

    return points;
}

// Function to create lightbulb points
function createLightbulbPoints() {
    const points = [];
    const pointTypes = []; // 0: bulb, 1: base, 2: glow
    const numPoints = 20000; // Same as diamondPoints.length

    // Bulb parameters
    const bulbRadius = 1;
    const bulbHeight = 1.5;

    // Base parameters
    const baseRadius = 0.3;
    const baseHeight = 0.5;

    // Glow parameters
    const glowRadius = 0.5;

    for (let i = 0; i < numPoints; i++) {
        // Randomly decide where to place the point: bulb, base, or glow
        const rand = Math.random();

        if (rand < 0.7) {
            // Bulb
            let u = Math.random();
            let v = Math.random();
            let theta = u * 2.0 * Math.PI;
            let phi = Math.acos(2.0 * v - 1.0);
            let r = bulbRadius * Math.cbrt(Math.random());

            let x = r * Math.sin(phi) * Math.cos(theta);
            let z = r * Math.sin(phi) * Math.sin(theta);
            let y = r * Math.cos(phi) + bulbHeight - 1.25; // Shift bulb upwards and center

            // Scale
            x *= 0.8;
            y *= 0.8;
            z *= 0.8;

            points.push(new THREE.Vector3(x, y, z));
            pointTypes.push(0); // bulb
        } else if (rand < 0.9) {
            // Base
            let angle = Math.random() * 2 * Math.PI;
            let radius = Math.sqrt(Math.random()) * baseRadius;
            let height = Math.random() * baseHeight;

            let x = radius * Math.cos(angle);
            let z = radius * Math.sin(angle);
            let y = height - 1.25; // Center the base

            // Scale
            x *= 0.8;
            y *= 0.8;
            z *= 0.8;

            points.push(new THREE.Vector3(x, y, z));
            pointTypes.push(1); // base
        } else {
            // Glow
            let u = Math.random();
            let v = Math.random();
            let theta = u * 2.0 * Math.PI;
            let phi = Math.acos(2.0 * v - 1.0);
            let r = glowRadius * Math.cbrt(Math.random());

            let x = r * Math.sin(phi) * Math.cos(theta);
            let z = r * Math.sin(phi) * Math.sin(theta);
            let y = r * Math.cos(phi) + bulbHeight - 1.25; // Center the glow

            // Scale
            x *= 0.8;
            y *= 0.8;
            z *= 0.8;

            points.push(new THREE.Vector3(x, y, z));
            pointTypes.push(2); // glow
        }
    }

    return { points, pointTypes };
}

// Function to adjust array lengths
function adjustPointsAndFlags(pointsArray, flagsArray, targetLength) {
    while (pointsArray.length < targetLength) {
        const randomIndex = Math.floor(Math.random() * pointsArray.length);
        pointsArray.push(pointsArray[randomIndex].clone());
        flagsArray.push(flagsArray[randomIndex]);
    }
    while (pointsArray.length > targetLength) {
        pointsArray.pop();
        flagsArray.pop();
    }
}

// Function to create letter A points
function createLetterPoints() {
    const points = [];

    // Scale for letters
    const scale = 0.4;

    // Common parameters
    const barWidth = 0.5 * scale;
    const barHeight = 1.5 * scale;
    const barMidpointZ = 0;

    // Letter positions
    const letterAPosX = -1.5 * scale;
    const dashPosX = 0;
    const letterZPosX = 1.5 * scale;

    // Create letter points first
    // Letter A
    {
        const barLeftMidpointX = letterAPosX - (0.75 * scale);
        const barRightMidpointX = letterAPosX + (0.75 * scale);
        const horizontalBarSpacing = 0.1 * scale;
        const diagonalBarSpacing = 0.1 * scale;

        // Diagonal bars for A
        for (let barIndex = 0; barIndex < 3; barIndex++) {
            const offset = (barIndex - 1) * diagonalBarSpacing;
            for (let x = barLeftMidpointX; x <= barRightMidpointX; x += 0.02) {
                const baseY = (barHeight - Math.abs(x - letterAPosX) * (barHeight / (0.75 * scale)));
                const y = baseY + offset;
                for (let z = barMidpointZ - barWidth / 2; z <= barMidpointZ + barWidth / 2; z += 0.02) {
                    points.push(new THREE.Vector3(x, y, z));
                }
            }
        }

        // Horizontal bars for A
        for (let barIndex = 0; barIndex < 3; barIndex++) {
            const barY = barHeight / 2 + (barIndex - 1) * horizontalBarSpacing;
            for (let x = barLeftMidpointX; x <= barRightMidpointX; x += 0.02) {
                for (let z = barMidpointZ - barWidth / 2; z <= barMidpointZ + barWidth / 2; z += 0.02) {
                    points.push(new THREE.Vector3(x, barY, z));
                }
            }
        }
    }

    // Dash
    {
        const dashWidth = 1.0 * scale;
        const dashHeight = 0.1 * scale;
        const dashY = 0.75 * scale;

        for (let x = dashPosX - dashWidth / 2; x <= dashPosX + dashWidth / 2; x += 0.02) {
            for (let y = dashY - dashHeight / 2; y <= dashY + dashHeight / 2; y += 0.02) {
                for (let z = barMidpointZ - barWidth / 2; z <= barMidpointZ + barWidth / 2; z += 0.02) {
                    points.push(new THREE.Vector3(x, y, z));
                }
            }
        }
    }

    // Letter Z
    {
        const barLeftX = letterZPosX - (0.75 * scale);
        const barRightX = letterZPosX + (0.75 * scale);
        const topY = barHeight;
        const bottomY = 0;
        const diagonalBarSpacing = 0.1 * scale;

        // Top bar
        for (let x = barLeftX; x <= barRightX; x += 0.02) {
            for (let y = topY - (0.05 * scale); y <= topY + (0.05 * scale); y += 0.02) {
                for (let z = barMidpointZ - barWidth / 2; z <= barMidpointZ + barWidth / 2; z += 0.02) {
                    points.push(new THREE.Vector3(x, y, z));
                }
            }
        }

        // Bottom bar
        for (let x = barLeftX; x <= barRightX; x += 0.02) {
            for (let y = bottomY - (0.05 * scale); y <= bottomY + (0.05 * scale); y += 0.02) {
                for (let z = barMidpointZ - barWidth / 2; z <= barMidpointZ + barWidth / 2; z += 0.02) {
                    points.push(new THREE.Vector3(x, y, z));
                }
            }
        }

        // Diagonal bars
        for (let barIndex = 0; barIndex < 3; barIndex++) {
            const offset = (barIndex - 1) * diagonalBarSpacing;
            for (let i = 0; i <= 1; i += 0.02) {
                const x = barRightX - i * (barRightX - barLeftX);
                const y = topY - i * (topY - bottomY);

                const dx = barRightX - barLeftX;
                const dy = bottomY - topY;
                const length = Math.sqrt(dx * dx + dy * dy);
                const normalizedX = -dy / length;
                const normalizedY = dx / length;

                const offsetX = normalizedX * offset;
                const offsetY = normalizedY * offset;

                for (let z = barMidpointZ - barWidth / 2; z <= barMidpointZ + barWidth / 2; z += 0.02) {
                    points.push(new THREE.Vector3(x + offsetX, y + offsetY, z));
                }
            }
        }
    }

    // Center letters vertically
    const verticalOffset = barHeight / 2;
    points.forEach(point => {
        point.y -= verticalOffset;
    });

    // Add sphere points
    const sphereRadius = 1;
    const spherePoints = 5500; // Adjust this number to control sphere density

    for (let i = 0; i < spherePoints; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
}

// Create light source point indicator (optional for light rays)
function createLightSource() {
    const geometry = new THREE.RingGeometry(0.03, 0.05, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -2;
    return ring;
}

// Create light rays (keeping as is)
function createLightRays(numRays, numVertices) {
    const sourcePosition = new THREE.Vector3(0, -2, 0);
    const positions = new Float32Array(numRays * 2 * 3);
    const colors = new Float32Array(numRays * 2 * 3);
    const indices = [];

    for (let i = 0; i < numRays; i++) {
        const idx = i * 6;

        // Start point (light source)
        positions[idx] = sourcePosition.x;
        positions[idx + 1] = sourcePosition.y;
        positions[idx + 2] = sourcePosition.z;

        colors[idx] = 0;
        colors[idx + 1] = 1;
        colors[idx + 2] = 1; // Cyan color at source

        // End point (initially same as start point)
        positions[idx + 3] = sourcePosition.x;
        positions[idx + 4] = sourcePosition.y;
        positions[idx + 5] = sourcePosition.z;

        colors[idx + 3] = 0;
        colors[idx + 4] = 0.2;
        colors[idx + 5] = 0.2; // Darker cyan at endpoint

        const randomIndex = Math.floor(Math.random() * numVertices);
        indices.push(randomIndex);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(geometry, material);
    lineSegments.userData.indices = indices;

    return lineSegments;
}
