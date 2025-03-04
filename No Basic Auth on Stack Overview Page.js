// ==UserScript==
// @name         No Basic Auth on Stack Overview Page
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Add basic auth to specific URLs on designskins.com pages
// @author       Your Name
// @match        https://*.designskins.com/
// @icon         https://cdn.jsdelivr.net/gh/mhausenblas/kubectl-in-action@master/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Benutzername und Passwort hier einfügen
    const username = 'deindesign';
    const password = 'DeinDesign123';

    // Finde alle <a>-Tags
    let anchors = document.querySelectorAll('a');

    anchors.forEach(anchor => {
        let href = anchor.href;

        // Überprüfe, ob der href-Wert einem der Muster entspricht:
        // https://www.*.deindesign.*
        // https://files.*.designskins.com/
        // https://redis.*.designskins.com/
        if (href.match(/^https:\/\/www\..*\.deindesign\..*/) ||
            href.match(/^https:\/\/files\..*\.designskins\.com:444\//) ||
            href.match(/^https:\/\/redis\..*\.designskins\.com:444\//)) {
            // Erstelle die neue URL mit Basic Auth
            let newHref = href.replace(/^https:\/\//, `https://${username}:${password}@`);
            anchor.href = newHref;
            console.log(`URL geändert: ${href} -> ${newHref}`);
        }
    });
})();
