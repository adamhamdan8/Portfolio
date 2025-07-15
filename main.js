// burger
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    nav.classList.toggle("show");
}

// Slideshow on my picture
document.addEventListener("DOMContentLoaded", () => {
    const stack = document.getElementById("slideshowStack");
    const images = stack.querySelectorAll(".slideshow-image");
    const total = images.length;
    let current = 0;
    let interval = null;

    function updateStack() {
        images.forEach((img, i) => {
            img.classList.remove("active", "stack-1", "stack-2", "stack-3", "swipe-left");
        });

        const next1 = (current + 1) % total;
        const next2 = (current + 2) % total;
        const next3 = (current + 3) % total;

        images[current].classList.add("active");
        images[next1].classList.add("stack-1");
        images[next2].classList.add("stack-2");
        images[next3].classList.add("stack-3");
    }

    function transitionToNext() {
        const currentImg = images[current];
        currentImg.classList.add("swipe-left");

        setTimeout(() => {
            current = (current + 1) % total;
            updateStack();
        }, 600); // match CSS transition duration
    }

    function startSlideshow() {
        transitionToNext(); // trigger swipe immediately on hover
        interval = setInterval(transitionToNext, 2000);
    }

    function stopSlideshow() {
        clearInterval(interval);
    }

    stack.addEventListener("mouseenter", startSlideshow);
    stack.addEventListener("mouseleave", stopSlideshow);

    updateStack();
});

// Model Viewer
function openModel(modelName) {
    const viewer = document.getElementById('modelViewer');
    const modal = document.getElementById('modelModal');
    viewer.src = `models/${modelName}.glb`;
    modal.style.display = 'flex';
}

function closeModel() {
    document.getElementById('modelModal').style.display = 'none';
}

// Demo Video
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('demoVideo');
    modal.style.display = 'flex';
    video.currentTime = 0;
    video.play();
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('demoVideo');
    modal.style.display = 'none';
    video.pause();
    video.currentTime = 0;
}

// Unified click listener to close modals when clicking outside content
document.addEventListener('click', function(event) {
    // Model modal
    const modelModal = document.getElementById('modelModal');
    const modelContent = document.querySelector('#modelModal .modal-content');
    if (modelModal.style.display === 'flex' && !modelContent.contains(event.target) && modelModal.contains(event.target)) {
        closeModel();
    }

    // Video modal
    const videoModal = document.getElementById('videoModal');
    const videoContent = document.querySelector('#videoModal .modal-content');
    if (videoModal.style.display === 'flex' && !videoContent.contains(event.target) && videoModal.contains(event.target)) {
        closeVideoModal();
    }
});

// Scroll-triggered animation for experience timeline
document.addEventListener("DOMContentLoaded", () => {
    const entries = document.querySelectorAll(".timeline-entry");

    const observer = new IntersectionObserver((entriesList) => {
        entriesList.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.15
    });

    entries.forEach(entry => observer.observe(entry));
});

// footer quotes
const quotes = [
    "With great power, there must also come great responsibility.",
    "To me, my X-Men!",
    "Good for health, bad for education.",
    "It’s not wrong to dream. But you have to work for it.",
    "I always feel like I can do anything. That’s the main thing people are controlled by - their perception of themselves.",
    "Fear is the mind-killer.",
    "He who can destroy a thing has the real control of it.",
    "A beginning is a very delicate time.",
    "When the power is yours, the choice is yours.",
    "The ‘S’ stands for hope.",
    "It’s not just going to rain today. It’s going to pour.",
    "A lesson in humility teaches more than success ever could.",
    "You may have the facts on your side, but I have the resolve.",
    "The next thing you’re going to say is…"
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("footer-quote").textContent = randomQuote;
