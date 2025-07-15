// Example data: replace with real API calls later
const serverInfo = {
    players: ["Steve", "Alex", "CreeperFan"],
    ramUsage: "2.3 GB / 8 GB",
    consoleLogs: [
        "[12:01] Steve joined the game",
        "[12:02] Alex: Hello!",
        "[12:03] CreeperFan: Watch out!"
    ]
};

// Update the players card
function updatePlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = ''; // clear previous list

    serverInfo.players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        playerList.appendChild(li);
    });
}

// Update RAM usage card
function updateRamUsage() {
    const ramUsageEl = document.getElementById('ramUsage');
    ramUsageEl.textContent = serverInfo.ramUsage;
}

// Update console card
function updateConsole() {
    const consoleList = document.getElementById('consoleList');
    consoleList.innerHTML = ''; // clear old logs

    serverInfo.consoleLogs.forEach(log => {
        const li = document.createElement('li');
        li.textContent = log;
        consoleList.appendChild(li);
    });
}

// Call all updates when the page loads
function initDashboard() {
    updatePlayers();
    updateRamUsage();
    updateConsole();
}

// Optionally refresh data every few seconds later
// setInterval(initDashboard, 5000);

// Run once on page load
document.addEventListener('DOMContentLoaded', initDashboard);
