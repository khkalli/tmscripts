// ==UserScript==
// @name         [Stack] Auto Login - Tasks
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto-fill username and password
// @author       khkalli
// @icon         https://cdn.jsdelivr.net/gh/jenkinsci/jenkins@master/war/src/main/webapp/favicon.ico
// @include      https://tasks.*.designskins.com:444/
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var url = window.location.href;
        var pattern = /^https:\/\/tasks\..+\.designskins\.com\/login.*/;
        if (pattern.test(url)) {
            var usernameField = document.getElementById("j_username");
            var passwordField = document.getElementById("j_password");
            if (usernameField && passwordField) {
                usernameField.value = 'deindesign';
                passwordField.value = 'DeinDesign123';
                passwordField.form.submit();
            }
        }
    });
})();
