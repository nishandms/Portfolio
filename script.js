
document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    AOS.init();
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    // menuBtn.addEventListener("click", function () {
    //     mobileMenu.classList.toggle("hidden");
    //     if (menuBtn.querySelector("i").classList.contains("ri-menu-line")) {
    //         menuBtn
    //             .querySelector("i")
    //             .classList.replace("ri-menu-line", "ri-close-line");
    //     } else {
    //         menuBtn
    //             .querySelector("i")
    //             .classList.replace("ri-close-line", "ri-menu-line");
    //     }
    // });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
        link.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
            menuBtn
                .querySelector("i")
                .classList.replace("ri-close-line", "ri-menu-line");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Project Filters
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remove active class from all buttons
            filterBtns.forEach((b) =>
                b.classList.remove("active", "bg-white", "shadow-sm", "text-gray-800"),
            );
            filterBtns.forEach((b) => b.classList.add("text-gray-600"));

            // Add active class to clicked button
            this.classList.add("active", "bg-white", "shadow-sm", "text-gray-800");
            this.classList.remove("text-gray-600");

            const filter = this.getAttribute("data-filter");

            projectCards.forEach((card) => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Back to Top Button
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove("opacity-0", "invisible");
            backToTopBtn.classList.add("opacity-100", "visible");
        } else {
            backToTopBtn.classList.add("opacity-0", "invisible");
            backToTopBtn.classList.remove("opacity-100", "visible");
        }
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Theme Toggle
//     const themeToggle = document.getElementById("themeToggle");
//     const html = document.documentElement;

//     // Check for saved theme preference or use user's system preference
//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)",
//     ).matches;

//     if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
//         html.classList.add("dark");
//         themeToggle.checked = true;
//     }

//     themeToggle.addEventListener("change", function () {
//         if (this.checked) {
//             html.classList.add("dark");
//             localStorage.setItem("theme", "dark");
//         } else {
//             html.classList.remove("dark");
//             localStorage.setItem("theme", "light");
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    // Contact Form Validation
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        const agreement = document.getElementById("agreement").checked;

        if (!name || !email || !subject || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!agreement) {
            alert("Please agree to the privacy policy and terms of service.");
            return;
        }

        // Here you would normally send the form data to your server
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
    });

    // Mobile menu toggle
    const menuButton = document.querySelector('.ri-menu-line');
    const nav = document.querySelector('nav');
    menuButton.addEventListener('click', function () {
        nav.classList.toggle('custom-nav');
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
        nav.classList.toggle('flex-col');
        nav.classList.toggle('absolute');
        nav.classList.toggle('top-16');
        nav.classList.toggle('right-4');
        nav.classList.toggle('bg-white');
        nav.classList.toggle('p-4');
        nav.classList.toggle('shadow-lg');
    });
});