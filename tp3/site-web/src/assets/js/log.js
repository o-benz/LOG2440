import HTTPManager from "./HTTPManager.js";
import SERVER_URL from "./consts.js";

const httpManager = new HTTPManager(SERVER_URL);
const logs = await httpManager.get('/logs');

const logsContainer = document.getElementById('logs-container');

// Note : l'utilisation d'innerHTML est à des fins de simplicité. À ne pas utiliser dans un projet industriel
logs.forEach(log => {
    const logHTML = `
    <div class="log">
        <p>${log}</p>
    </div>
    `;
    logsContainer.innerHTML += logHTML;
});
