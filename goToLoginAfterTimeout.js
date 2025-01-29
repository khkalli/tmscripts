// ==UserScript==
// @name         Navigate to Jira Login
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Navigate to login page when timeouted
// @author       Your Name
// @match        https://intranet.cewe.lan/jira/secure/Logout**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', () => {
       window.location.href = '/jira/login.jsp'
    })
})();
