import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { About } from './about.js'
import { WorkListing } from './work-listing.js'
import { Home } from './home.js'
import { CursorFollower, Global, ImageRevealAnimation } from './global.js'
import { Work } from './work.js'
import { Contact } from './contact.js'
import { NotFound } from './not-found.js'

gsap.config({
	nullTargetWarn: false,
})

let lenis

function setupLenis() {
	lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		direction: 'vertical',
		gestureDirection: 'vertical',
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: false,
		touchMultiplier: 2,
		syncTouch: false,
		infinite: false,
	})
	lenis.scrollTo(0, { immediate: true })

	const raf = (time) => {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf)
}

function resetWebflow(data) {
	const parser = new DOMParser()
	const dom = parser.parseFromString(data.next.html, 'text/html')
	const webflowPageId = dom.querySelector('html').getAttribute('data-wf-page')
	const siteId = dom.querySelector('html').getAttribute('data-wf-site')

	document.querySelector('html').setAttribute('data-wf-page', webflowPageId)
	if (window.Webflow) {
		window.Webflow.destroy()
		window.Webflow.ready()
		window.Webflow.require('commerce').init({ siteId: siteId })
		window.Webflow.require('ix2').init()
	}
}

barba.hooks.beforeLeave((data) => {
	// Kill ScrollTrigger instances
	ScrollTrigger.killAll()

	// Kill GSAP tweens
	gsap.getTweensOf(data.current.container.querySelectorAll('*')).forEach((tween) => {
		tween.revert()
		tween.kill()
	})

	ScrollTrigger.clearScrollMemory()
})

barba.hooks.enter((data) => {
	gsap.set([data.next.container, data.current.container], {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100vh',
	})
})
barba.hooks.after((data) => {
	gsap.set(data.next.container, {
		position: 'relative',
		height: 'auto',
		clearProps: 'all',
	})
	resetWebflow(data)
	ScrollTrigger.refresh()
})

let firstLoad = true
let globalInstance
barba.init({
	preventRunning: true,
	views: [
		{
			namespace: 'home',
			beforeEnter(data) {
				//globalInstance = new Global(data.next.container);
				setupLenis()
			},
			afterEnter(data) {
				new Home(data.next.container, lenis)
				if (firstLoad && !sessionStorage.getItem('firstLoad')) {
					firstLoad = false
				}
			},
		},
		{
			namespace: 'work',
			beforeEnter(data) {
				globalInstance = new Global(data.next.container)
				setupLenis()
			},
			afterEnter(data) {
				new CursorFollower(data.next.container)
				new Work(data.next.container)
				new ImageRevealAnimation(data.next.container)
			},
		},
		{
			namespace: 'about',
			beforeEnter(data) {
				globalInstance = new Global(data.next.container)
				setupLenis()
			},
			afterEnter(data) {
				new About(data.next.container)
			},
		},
		{
			namespace: 'contact',
			beforeEnter(data) {
				globalInstance = new Global(data.next.container)
				setupLenis()
			},
			afterEnter(data) {
				new Contact(data.next.container)
			},
		},
		{
			namespace: 'work-listing',
			beforeEnter(data) {
				globalInstance = new Global(data.next.container)
				setupLenis()
			},
			afterEnter(data) {
				new WorkListing(data.next.container)
			},
		},
		{
			namespace: '404',
			beforeEnter(data) {
				globalInstance = new Global(data.next.container)
			},
			afterEnter(data) {
				new NotFound(data.next.container)
			},
		},
	],
	transitions: [
		{
			sync: true,
			enter(data) {
				const nextContainer = data.next.container
				const currentContainer = data.current.container
				let tlTransition = gsap.timeline({
					defaults: {
						ease: 'expo.out',
						onComplete: () => {
							ScrollTrigger.refresh()
						},
					},
				})
				tlTransition.to(currentContainer, { opacity: 0, duration: 1 }, '<')
				tlTransition.from(nextContainer, { opacity: 0, duration: 1 }, '<')
				return tlTransition
			},
		},
	],
})
