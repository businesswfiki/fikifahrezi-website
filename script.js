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

// Switch tabs
function switchTab(tabName) {
    // 1. Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 2. Deactivate all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 3. Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // 4. Activate clicked button
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

// --- FUNGSI HITUNG UMUR OTOMATIS ---
function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Jika bulan belum sampai, atau bulan sama tapi tanggal belum sampai, kurangi 1
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hitung dan Tampilkan Umur (03 September 2005)
    const birthDate = "09/03/2005"; // MM/DD/YYYY
    const ageElement = document.getElementById('currentAge');
    if (ageElement) {
        const age = calculateAge(birthDate);
        ageElement.textContent = `${age} Years Old`;
    }

    // 2. Observer untuk animasi kartu
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// --- ELASTIC DRAG & FLIP LOGIC ---
const cardContainer = document.getElementById('tiltCard');
const cardInner = document.querySelector('.id-card-inner');
const glare = document.querySelector('.card-glare');

let isDragging = false;
let isMoving = false; 
let startX, startY;

if (cardContainer && cardInner) {
    // 1. SAAT MOUSE DITEKAN (MULAI TARIK)
    cardContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        isMoving = false; 
        
        startX = e.clientX;
        startY = e.clientY;
        
        cardInner.style.transition = 'none';
        cardInner.style.cursor = 'grabbing';
    });

    // 2. SAAT MOUSE BERGERAK (SEDANG MENARIK)
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - startX;
        const y = e.clientY - startY;

        // Tentukan apakah pergerakan cukup besar untuk dianggap 'drag'
        if (Math.abs(x) > 5 || Math.abs(y) > 5) {
            isMoving = true;
        }

        e.preventDefault(); 

        const rotateY = x * 0.02; 
        const rotateX = -y * 0.02;

        cardInner.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Pindahkan efek Glare
        const rect = cardContainer.getBoundingClientRect();
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        glare.style.transform = `translate(${x}px, ${y}px)`; 
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
    });

    // 3. SAAT MOUSE DILEPAS (SNAP BACK ATAU FLIP)
    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const bouncyTransition = 'transform 0.6s cubic-bezier(0.3, 1.5, 0.6, 1.2)';
        
        if (isMoving) {
            // JIKA DRAG: Snap back
            cardInner.style.transition = bouncyTransition;
            glare.style.transition = bouncyTransition;
            
            // Pertahankan status flip saat reset posisi
            const isCurrentlyFlipped = cardInner.classList.contains('is-flipped');
            
            cardInner.style.transform = isCurrentlyFlipped 
                ? 'translate(0px, 0px) rotateY(180deg)' 
                : 'translate(0px, 0px) rotateY(0deg)';
                
            glare.style.transform = 'translate(0px, 0px)';
            glare.style.background = 'transparent';
            cardInner.style.cursor = 'grab';
            
        } else {
            // JIKA HANYA KLIK: Flip
            cardInner.style.transition = 'transform 0.6s ease-in-out'; 
            cardInner.classList.toggle('is-flipped');
            cardInner.style.cursor = 'grab';
        }
        
        isMoving = false; 
    });
    
    // Listener terpisah untuk klik (agar berfungsi di perangkat non-mouse)
    cardContainer.addEventListener('click', (e) => {
        // Mencegah flip jika event 'drag' baru saja terjadi
        // Logika flip sudah dihandle di mouseup (sebagai klik)
        if (isMoving) return;
    });
}