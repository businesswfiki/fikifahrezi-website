document.querySelectorAll('.explore-btn').forEach((btn, index) => {
    const links = [
        'https://chat.openai.com/', 
        'https://gemini.google.com/', 
        'https://claude.ai/', 
        'https://www.mathworks.com/products/matlab.html', 
        'https://www.canva.com/', 
        'https://affinity.serif.com/', 
        'https://www.tokopedia.com/gudanglaptopsemarang/acer-aspire-3-a315-23-r7ey-amd-ryzen-3-3250u-8gb-256gb-15-6-inch-fhd-gl10-990', 
        'https://www.vivo.com/id/products/param/y19s' 
    ];

    btn.addEventListener('click', (event) => {
        event.preventDefault(); 
        const url = links[index];
        if(url) {
            window.open(url, '_blank');
        }
    });
});

function openNav() {
    document.body.classList.add("menu-open");
    document.getElementById("myOverlay").classList.add("open");
}

function closeNav() {
    document.body.classList.remove("menu-open");
    document.getElementById("myOverlay").classList.remove("open");
}


document.addEventListener('DOMContentLoaded', () => {

    const dimOverlay = document.getElementById('dim-overlay');
    if (dimOverlay) {
        dimOverlay.addEventListener('click', closeNav);
    }
        });
