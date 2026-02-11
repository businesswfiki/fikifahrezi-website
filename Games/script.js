document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".copy-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-copy");
            const text = document.getElementById(id).innerText;

            navigator.clipboard.writeText(text);

            this.innerText = "Copied!";
            setTimeout(() => this.innerText = "Copy", 1500);
        });
    });

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabSections = document.querySelectorAll(".games-wrapper");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", function () {

            const target = this.getAttribute("data-tab");

            tabButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            tabSections.forEach(sec => sec.classList.remove("active"));

            const selected = document.getElementById(target);

            if (selected) {
                selected.classList.add("active");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const nextBtn = document.querySelector(".modal-btn.next");
    const prevBtn = document.querySelector(".modal-btn.prev");
    const closeBtn = document.querySelector(".close-modal");
    const indicator = document.getElementById("indicator");

    let currentImages = [];
    let currentIndex = 0;
    let modalOpen = false;
    let isAnimating = false;

    document.querySelectorAll(".screenshot-grid").forEach(grid => {

        const images = grid.querySelectorAll("img");

        images.forEach((img, index) => {
            img.addEventListener("click", function () {
                currentImages = Array.from(images);
                currentIndex = index;
                openModal();
            });
        });
    });

    function openModal() {
        if (currentImages.length === 0) return;

        modal.classList.add("active");
        modalOpen = true;

        modalImg.src = currentImages[currentIndex].src;
        updateIndicator();
        updateButtons();
    }

    function closeModal() {
        modal.classList.remove("active");
        modalOpen = false;
    }

    function updateIndicator() {
        indicator.innerText = `${currentIndex + 1} / ${currentImages.length}`;
    }

    function updateButtons() {
        prevBtn.style.display = currentIndex === 0 ? "none" : "block";
        nextBtn.style.display = currentIndex === currentImages.length - 1 ? "none" : "block";
    }

    function changeImage(direction) {

        if (isAnimating) return;
        isAnimating = true;

        modalImg.style.transition = "all 0.4s ease";
        modalImg.style.opacity = 0;
        modalImg.style.transform =
            direction === "next"
                ? "translateX(-40px) scale(0.97)"
                : "translateX(40px) scale(0.97)";

        setTimeout(() => {

            modalImg.src = currentImages[currentIndex].src;

            updateIndicator();
            updateButtons();

            modalImg.style.opacity = 1;
            modalImg.style.transform = "translateX(0) scale(1)";

            setTimeout(() => isAnimating = false, 400);

        }, 200);
    }

    function nextImage() {
        if (!modalOpen) return;

        if (currentIndex === currentImages.length - 1) {
            closeModal();
            return;
        }

        currentIndex++;
        changeImage("next");
    }

    function prevImage() {
        if (!modalOpen) return;

        if (currentIndex === 0) {
            closeModal();
            return;
        }

        currentIndex--;
        changeImage("prev");
    }

    nextBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        nextImage();
    });

    prevBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        prevImage();
    });

    document.addEventListener("keydown", function (e) {

        if (!modalOpen) return;

        if (e.key === "ArrowRight") {
            nextImage();
        }

        if (e.key === "ArrowLeft") {
            prevImage();
        }

        if (e.key === "Escape") {
            closeModal();
        }
    });

    let startX = 0;

    modal.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    modal.addEventListener("touchend", function (e) {

        if (!modalOpen) return;

        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (Math.abs(diff) > 60) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    });

    closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
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

document.getElementById("dim-overlay").addEventListener("click", function () {
    closeNav();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeNav();
    }
});
