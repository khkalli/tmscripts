// ==UserScript==
// @name         Auto Login - Jira
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Secure auto-login using a custom input modal for credentials stored in localStorage.
// @author       khkalli
// @include      https://intranet.cewe.lan/*/login*
// @icon         https://intranet.cewe.lan/jira/s/-iks11f/9120015/13kdaso/_/jira-favicon-hires.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion zum Erstellen eines benutzerdefinierten Eingabemodals
    function createLoginModal() {
        return new Promise((resolve) => {
            // Modal-Hintergrund
            const modalBackground = document.createElement('div');
            modalBackground.style.position = 'fixed';
            modalBackground.style.top = 0;
            modalBackground.style.left = 0;
            modalBackground.style.width = '100%';
            modalBackground.style.height = '100%';
            modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modalBackground.style.zIndex = '1000';
            modalBackground.style.display = 'flex';
            modalBackground.style.justifyContent = 'center';
            modalBackground.style.alignItems = 'center';

            // Modal-Box
            const modalBox = document.createElement('div');
            modalBox.style.backgroundColor = '#fff';
            modalBox.style.padding = '20px';
            modalBox.style.borderRadius = '10px';
            modalBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            modalBox.style.width = '300px';
            modalBox.style.textAlign = 'center';

            // Username-Feld
            const usernameLabel = document.createElement('label');
            usernameLabel.textContent = 'Benutzername:';
            const usernameInput = document.createElement('input');
            usernameInput.type = 'text';
            usernameInput.style.width = '100%';
            usernameInput.style.marginBottom = '10px';

            // Passwort-Feld
            const passwordLabel = document.createElement('label');
            passwordLabel.textContent = 'Passwort:';
            const passwordInput = document.createElement('input');
            passwordInput.type = 'password'; // Passwort unkenntlich machen
            passwordInput.style.width = '100%';
            passwordInput.style.marginBottom = '10px';

            // Bestätigungs-Button
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Login';
            submitButton.style.width = '100%';
            submitButton.style.padding = '10px';
            submitButton.style.backgroundColor = '#007bff';
            submitButton.style.color = '#fff';
            submitButton.style.border = 'none';
            submitButton.style.cursor = 'pointer';

            // Event-Listener für den Button
            submitButton.addEventListener('click', () => {
                const username = usernameInput.value;
                const password = passwordInput.value;

                if (username && password) {
                    document.body.removeChild(modalBackground);
                    resolve({ username, password });
                } else {
                    alert('Bitte fülle beide Felder aus.');
                }
            });

            // Zusammenfügen der Elemente
            modalBox.appendChild(usernameLabel);
            modalBox.appendChild(usernameInput);
            modalBox.appendChild(passwordLabel);
            modalBox.appendChild(passwordInput);
            modalBox.appendChild(submitButton);
            modalBackground.appendChild(modalBox);
            document.body.appendChild(modalBackground);
        });
    }

    // Funktion zum Abrufen der Anmeldedaten
    async function getCredentials() {
        let username = localStorage.getItem('jiraLoginUsername');
        let password = localStorage.getItem('jiraLoginPassword');

        if (!username || !password) {
            const credentials = await createLoginModal();
            if (credentials.username && credentials.password) {
                localStorage.setItem('jiraLoginUsername', credentials.username);
                localStorage.setItem('jiraLoginPassword', credentials.password);
            }
            return credentials;
        }

        return { username, password };
    }

    // Überprüfen, ob die Seite geladen ist und ob die Elemente vorhanden sind
    window.addEventListener('load', async function() {
        let usernameField = document.getElementById('login-form-username');
        if(!usernameField) {
            usernameField = document.querySelector('input[name="os_username"]');
        }
        let passwordField = document.getElementById('login-form-password');
        if(!passwordField) {
            passwordField = document.querySelector('input[name="os_password"]')
        }
        let formElement = usernameField ? usernameField.form : null;

        if (usernameField && passwordField && formElement) {
            // Anmeldedaten abrufen
            let credentials = await getCredentials();
            if (credentials.username && credentials.password) {
                // Anmeldedaten eingeben
                usernameField.value = credentials.username;
                passwordField.value = credentials.password;

                // Formular abschicken
                formElement.submit();
            }
        }
    });

})();
