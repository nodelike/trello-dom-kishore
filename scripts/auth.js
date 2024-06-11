import { handleTheme, showToast } from "./utils.js";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toggle-theme').addEventListener('click', handleTheme);

    document.getElementById('auth-form').addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const apiKey = document.getElementById('api-key').value;
            const token = document.getElementById('token').value;

            if (!apiKey || !token) {
                showToast.error('API Key and Token are required');
                return;
            }

            const urlParams = new URLSearchParams();
            urlParams.append('apiKey', apiKey);
            urlParams.append('token', token);

            window.location.href = `boards.html?${urlParams.toString()}`;
        } catch (error) {
            showToast.error(error.message);
        }
    });
});
