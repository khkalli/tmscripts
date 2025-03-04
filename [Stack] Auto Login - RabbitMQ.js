// ==UserScript==
// @name         [Stack] Auto Login - RabbitMQ
// @namespace    http://tampermonkey.net/
// @version      2025-03-04
// @description  auto login to rabbitmq on stacks
// @author       khkalli
// @include      https://rabbitmq.*.designskins.com:444/*
// @icon         https://cdn.jsdelivr.net/gh/rabbitmq/rabbitmq-management@master/priv/www/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        document.querySelector('input[name="username"]').value = "deindesign";
        document.querySelector('input[name="password"]').value = "DeinDesign123";
        document.querySelector('input[type="submit"]').click()
    });
})();
