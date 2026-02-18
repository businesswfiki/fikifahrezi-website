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

document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', event => {
        event.preventDefault();

        const url = btn.getAttribute('data-link');

        if (url) {
            window.open(url, '_blank');
        }
    });
});
