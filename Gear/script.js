// Fungsi untuk tombol Explore, urutan sesuai tombol di index.html (6 gear + 2 devices)
document.querySelectorAll('.explore-btn').forEach((btn, index) => {
    const links = [
        'https://chat.openai.com/', // ChatGPT
        'https://gemini.google.com/', // Gemini
        'https://claude.ai/', // Claude
        'https://www.mathworks.com/products/matlab.html', // MATLAB
        'https://www.canva.com/', // Canva
        'https://affinity.serif.com/', // Affinity
        'https://www.tokopedia.com/gudanglaptopsemarang/acer-aspire-3-a315-23-r7ey-amd-ryzen-3-3250u-8gb-256gb-15-6-inch-fhd-gl10-990', // Laptop
        'https://www.vivo.com/id/products/param/y19s' // HP Vivo
    ];

    btn.addEventListener('click', (event) => {
        event.preventDefault(); // Cegah event default jika ada
        const url = links[index];
        if(url) {
            window.open(url, '_blank');
        }
    });
});

// --- LOGIC MENU OVERLAY ---
// Fungsi ini harus ada agar tombol menu di HTML 2 bisa dibuka
function openNav() {
    // 1. Tambahkan kelas 'menu-open' ke <body> (untuk mengunci scroll & efek push)
    document.body.classList.add("menu-open");
    // 2. Tambahkan kelas 'open' ke overlay menu (untuk menampilkannya)
    document.getElementById("myOverlay").classList.add("open");
}

// Fungsi ini harus ada agar tombol close dan dim-overlay bisa menutup menu
function closeNav() {
    // 1. Hapus kelas 'menu-open' dari <body>
    document.body.classList.remove("menu-open");
    // 2. Hapus kelas 'open' dari overlay menu
    document.getElementById("myOverlay").classList.remove("open");
}


// --- FUNGSI UTAMA (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {

    // KUNCI FIX: CLOSE MENU SAAT KLIK DIMMING AREA
    // Logika ini penting karena di HTML Anda menggunakan dim-overlay
    const dimOverlay = document.getElementById('dim-overlay');
    if (dimOverlay) {
        dimOverlay.addEventListener('click', closeNav);
    }

    // --- FUNGSI KHUSUS Halaman Gear (Tombol Explore) ---
    // Fungsi untuk tombol Explore, urutan sesuai tombol di HTML 2
    document.querySelectorAll('.explore-btn').forEach((btn, index) => {
        const links = [
            'https://chat.openai.com/', // ChatGPT
            'https://gemini.google.com/', // Gemini
            'https://claude.ai/', // Claude
            'https://www.mathworks.com/products/matlab.html', // MATLAB
            'https://www.canva.com/', // Canva
            'https://affinity.serif.com/', // Affinity
            'https://www.tokopedia.com/gudanglaptopsemarang/acer-aspire-3-a315-23-r7ey-amd-ryzen-3-3250u-8gb-256gb-15-6-inch-fhd-gl10-990', // Laptop
            'https://www.vivo.com/id/products/param/y19s' // HP Vivo
        ];

        btn.addEventListener('click', (event) => {
            event.preventDefault(); // Cegah event default jika ada
            const url = links[index];
            if(url) {
                window.open(url, '_blank');
            }
        });
    });
});