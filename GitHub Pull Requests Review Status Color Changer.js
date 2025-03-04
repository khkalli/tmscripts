// ==UserScript==
// @name         GitHub Pull Requests Review Status Color Changer
// @namespace    https://github.com/DeinDesign/base/pulls
// @version      1.1
// @description  Ändere die Farbe von Review-Status basierend auf dem aria-label in Pull Requests
// @author       Your Name
// @match        https://github.com/DeinDesign/base/pulls**
// @icon         https://github.githubassets.com/assets/apple-touch-icon-144x144-b882e354c005.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function changeLinkColors() {
        const anchors = document.querySelectorAll('a[aria-label]');

        anchors.forEach(anchor => {
            const ariaLabel = anchor.getAttribute('aria-label').toLowerCase();

            if (ariaLabel.includes('review approval')) {
                anchor.style.setProperty('color', 'rgba(193,134,244,1)', 'important');
            }else if (ariaLabel.includes('requesting changes')) {
                anchor.style.setProperty('color', 'rgba(251,202,4,1)', 'important');
            }
        });
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            changeLinkColors();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    window.addEventListener('load', function() {
        changeLinkColors();
    });

})();
