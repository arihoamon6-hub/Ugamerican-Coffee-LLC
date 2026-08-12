// Ugamerican Coffee — site behavior

document.addEventListener('DOMContentLoaded', function () {

    // Mobile / laptop nav toggle
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var NAV_BREAKPOINT = 1080;

    function closeNav() {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });

        // Close when clicking outside the menu
        document.addEventListener('click', function (e) {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                closeNav();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeNav();
                hamburger.focus();
            }
        });

        // Reset menu state if the window is resized past the nav breakpoint
        window.addEventListener('resize', function () {
            if (window.innerWidth > NAV_BREAKPOINT) closeNav();
        });
    }

    // Shop filters
    var filterButtons = document.querySelectorAll('.shop-filters button');
    var productCards = document.querySelectorAll('.shop-grid .product-card');

    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filter = btn.getAttribute('data-filter');

                productCards.forEach(function (card) {
                    var species = card.getAttribute('data-species');
                    var show = (filter === 'all' || species === filter);
                    card.hidden = !show;
                });
            });
        });
    }

});
