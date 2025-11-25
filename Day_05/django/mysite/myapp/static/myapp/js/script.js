
//  nav toggle + simple header transition

console.log("JS file loaded successfully!");

(function () {
    'use strict';

    
    document.addEventListener('DOMContentLoaded', function () {
        // Header transition 
        const header = document.querySelector('header');
        if (header) {
            header.style.transition = '0.3s';
        }

        // Mobile nav toggle
        const navToggleBtn = document.getElementById('nav-toggle');
        const topNav = document.querySelector('.top-nav');

        if (navToggleBtn && topNav) {
           
            function toggleNav() {
                topNav.classList.toggle('open');
            }

            
            
            if (!navToggleBtn.__hasNavToggleListener) {
                navToggleBtn.addEventListener('click', toggleNav);
                navToggleBtn.__hasNavToggleListener = true;
            }
        }
    });
})();
