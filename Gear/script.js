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

    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();

            const url = btn.getAttribute('data-link');

            if (url) {
                window.open(url, '_blank');
            }
        });
    });
});
