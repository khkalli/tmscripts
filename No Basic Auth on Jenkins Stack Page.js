// ==UserScript==
// @name         No Basic Auth on Jenkins Stack Page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ci.designskins.com/view/Deployment/job/Stacks/job/**
// @icon         https://cdn.jsdelivr.net/gh/mhausenblas/kubectl-in-action@master/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // All Buttons on Overiew Page
    var urlPattern = /https:\/\/([a-zA-Z0-9-]+)\.designskins\.com/;
    // Overview Page Button
    if(window.location.href.startsWith('https://ci.designskins.com/jenkins/view/Deployment/job/Stacks/job/')){
        let xpath = "//a[text()='Overview Page']";
        let href = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('href');
        let parts = href.split('//');
        let newHref = parts[0] + '//deindesign:DeinDesign123@' + parts[1];
        document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.setAttribute('href', newHref);
    }
    else if (urlPattern.test(window.location.href)) {
        let anchorTags = document.querySelectorAll('a');
        anchorTags.forEach(function(anchorTag) {
            let href = anchorTag.getAttribute('href');
            if (href && (href.includes('.deindesign.') || href.includes('.designskins.'))) {
                let parts = href.split('//');
                let newHref = parts[0] + '//deindesign:DeinDesign123@' + parts[1];
                anchorTag.setAttribute('href', newHref);
            }
        });
    }

})();
