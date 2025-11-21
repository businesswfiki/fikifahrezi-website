// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// LOGIC MENU OVERLAY 
function openNav() {
    document.body.classList.add("menu-open");
    document.getElementById("myOverlay").classList.add("open");
}

function closeNav() {
    document.body.classList.remove("menu-open");
    document.getElementById("myOverlay").classList.remove("open");
}

// Switch tabs
function switchTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// FUNGSI HITUNG UMUR OTOMATIS 
function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const birthDate = "09/03/2005"; 
    const ageElement = document.getElementById('currentAge');
    if (ageElement) {
        const age = calculateAge(birthDate);
        ageElement.textContent = `${age} Years Old`;
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
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

// ELASTIC DRAG & FLIP LOGIC 
const cardContainer = document.getElementById('tiltCard');
const cardInner = document.querySelector('.id-card-inner');
const glare = document.querySelector('.card-glare');

let isDragging = false;
let isMoving = false; 
let startX, startY;

if (cardContainer && cardInner) {
    cardContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        isMoving = false; 
        
        startX = e.clientX;
        startY = e.clientY;
        
        cardInner.style.transition = 'none';
        cardInner.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - startX;
        const y = e.clientY - startY;

        if (Math.abs(x) > 5 || Math.abs(y) > 5) {
            isMoving = true;
        }

        e.preventDefault(); 

        const rotateY = x * 0.02; 
        const rotateX = -y * 0.02;

        cardInner.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        const rect = cardContainer.getBoundingClientRect();
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        glare.style.transform = `translate(${x}px, ${y}px)`; 
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const smootherTransition = 'transform 0.5s ease-out'; 
        
        if (isMoving) {
            cardInner.style.transition = smootherTransition; 
            glare.style.transition = smootherTransition;
            
            const isCurrentlyFlipped = cardInner.classList.contains('is-flipped');
            
            cardInner.style.transform = isCurrentlyFlipped 
                ? 'translate(0px, 0px) rotateY(180deg)' 
                : 'translate(0px, 0px) rotateY(0deg)';
                
            glare.style.transform = 'translate(0px, 0px)';
            glare.style.background = 'transparent';
            cardInner.style.cursor = 'grab';
            
        } else {
            cardInner.style.transition = 'transform 0.6s ease-in-out'; 
            cardInner.classList.toggle('is-flipped');
            cardInner.style.cursor = 'grab';
        }
        
        isMoving = false; 
    });
    
    cardContainer.addEventListener('click', (e) => {
        if (isMoving) return;
    });
}
