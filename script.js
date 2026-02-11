function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openNav() {
    document.body.classList.add("menu-open");
    document.getElementById("myOverlay").classList.add("open");
}

function closeNav() {
    document.body.classList.remove("menu-open");
    document.getElementById("myOverlay").classList.remove("open");
}

function switchTab(tabName) {
    const e = window.event;

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const selectedTab = document.getElementById(tabName);

    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    if (e && e.currentTarget) {
        e.currentTarget.classList.add('active');
    }
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

document.addEventListener('DOMContentLoaded', () => {
    const ageElement = document.getElementById('currentAge');

    if (ageElement) {
        const age = calculateAge("09/03/2005");
        ageElement.textContent = `${age} Years Old`;
    }

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const dimOverlay = document.getElementById('dim-overlay');

    if (dimOverlay) {
        dimOverlay.addEventListener('click', closeNav);
    }
});

const cardContainer = document.getElementById('tiltCard');
const cardInner = document.querySelector('.id-card-inner');
const glare = document.querySelector('.card-glare');

let isDragging = false;
let isMoving = false;
let startX;
let startY;

if (cardContainer && cardInner) {
    cardContainer.addEventListener('mousedown', e => {
        isDragging = true;
        isMoving = false;
        startX = e.clientX;
        startY = e.clientY;

        cardInner.style.transition = 'none';
        cardInner.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;

        const x = e.clientX - startX;
        const y = e.clientY - startY;

        if (Math.abs(x) > 5 || Math.abs(y) > 5) {
            isMoving = true;
        }

        const rotateY = x * 0.02;
        const rotateX = -y * 0.02;

        cardInner.style.transform =
            `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const rect = cardContainer.getBoundingClientRect();
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        glare.style.background =
            `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;

        isDragging = false;

        const smoother = 'transform 0.5s ease-out';
        cardInner.style.transition = smoother;
        glare.style.transition = smoother;

        const flipped = cardInner.classList.contains('is-flipped');

        cardInner.style.transform = flipped
            ? 'rotateY(180deg)'
            : 'rotateY(0deg)';

        glare.style.background = 'transparent';

        if (!isMoving) {
            cardInner.classList.toggle('is-flipped');
        }

        isMoving = false;
        cardInner.style.cursor = 'grab';
    });
}

const lastUpdateEl = document.getElementById('lastUpdate');
if (lastUpdateEl) {
    const lastModified = new Date(document.lastModified);

    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    lastUpdateEl.textContent =
        lastModified.toLocaleDateString('en-GB', options);
}
