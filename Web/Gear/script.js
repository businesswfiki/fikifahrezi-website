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