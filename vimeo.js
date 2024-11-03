/*
document.addEventListener('DOMContentLoaded', function () {
    const iframe = document.querySelector('#introVideo');

    // If the iframe uses lazy loading, we need to trigger the load event manually
    if (iframe.getAttribute('data-src')) {
        iframe.setAttribute('src', iframe.getAttribute('data-src'));
    }

    // Initialize the Vimeo player
    const player = new Vimeo.Player(iframe);

    // Get the parent container to observe
    const container = iframe.parentElement;
    const heading = document.querySelector('.heading-xs.m');

    // Set up the Intersection Observer
    const observer= new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Play');
            } else {
                console.log('Pause');
            }
        });
    },{
            threshold: 0.5
        }
    );

    // Start observing the container
    observer.observe(container);
});


 */

document.addEventListener('DOMContentLoaded', function () {
    const iframes = [...document.querySelectorAll('.vimeoVideo')];

    // Initialize players for all videos
    const players = iframes.map(iframe => {
        // Handle lazy loading
        if (iframe.getAttribute('data-src')) {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
        }
        return new Vimeo.Player(iframe);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Find the corresponding player for this container
            const container = entry.target;
            const iframe = container.querySelector('.vimeoVideo');
            const playerIndex = iframes.indexOf(iframe);
            const player = players[playerIndex];

            if (entry.isIntersecting) {
                console.log(`Video ${playerIndex} intersecting`);
                player?.setMuted(false);
            } else {
                console.log(`Video ${playerIndex} not intersecting`);
                player?.setMuted(true);
            }
        });
    }, {
        threshold: 0.7
    });

    const videoContainers = iframes.map(iframe => iframe.parentElement);
    videoContainers.forEach(container => {
        observer.observe(container);
    });
})