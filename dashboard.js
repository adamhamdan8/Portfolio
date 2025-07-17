const serverInfo = {
  consoleLogs: [],
  players: [],
  mcRamUsage: '0 GB / 8 GB'
};


// Update server resource cards
function updateServerStats() {
    document.getElementById('cpuUsage').textContent = serverInfo.cpuUsage;
    document.getElementById('ramUsage').textContent = serverInfo.ramUsage;
    document.getElementById('diskUsage').textContent = serverInfo.diskUsage;
}

// Update Minecraft players
function updateMcPlayers() {
    const playersText = serverInfo.players.length > 0
        ? serverInfo.players.join(', ')
        : 'No players online';
    document.getElementById('mcPlayers').textContent = playersText;
}

// Update Minecraft RAM usage
function updateMcRamUsage() {
    document.getElementById('mcRamUsage').textContent = serverInfo.mcRamUsage;
}

// Update Minecraft console output
function updateMcConsole() {
    const consoleDiv = document.getElementById('mcConsole');
    consoleDiv.innerHTML = ''; // Clear old logs
    serverInfo.consoleLogs.forEach(log => {
        const line = document.createElement('div');
        line.textContent = log;
        consoleDiv.appendChild(line);
    });
}

// Initialize dashboard
function initDashboard() {
    updateServerStats();
    updateMcPlayers();
    updateMcRamUsage();
    updateMcConsole();
}

// Run once on page load
document.addEventListener('DOMContentLoaded', initDashboard);

// Optionally: refresh every few seconds in the future
setInterval(initDashboard, 5000);

// Generic function to update a usage bar and text
function updateUsageBar(barId, textId, percentage) {
  const bar = document.getElementById(barId);
  const text = document.getElementById(textId);

  if (!bar || !text) return; // safety check

  // Clamp percentage between 0 and 100
  percentage = Math.max(0, Math.min(percentage, 100));

  bar.style.width = percentage + '%';
  text.textContent = percentage + '%';
}

// Example update functions for each resource
function updateCpuUsage(percent) {
  document.getElementById('cpuBar').style.width = percent + '%';
  document.getElementById('cpuUsageText').textContent = percent + '%';
}

function updateRamUsage(percent) {
  document.getElementById('ramBar').style.width = percent + '%';
  document.getElementById('ramUsageText').textContent = percent + '%';
}

function updateDiskUsage(percent) {
  document.getElementById('diskBar').style.width = percent + '%';
  document.getElementById('diskUsageText').textContent = percent + '%';
}

// Demo: simulate dynamic updates for all three bars
document.addEventListener('DOMContentLoaded', () => {
  let cpu = 0, ram = 0, disk = 0;
  const interval = setInterval(() => {
    if (cpu > 100) {
      clearInterval(interval);
      return;
    }
    updateCpuUsage(cpu);
    updateRamUsage(ram);
    updateDiskUsage(disk);

    cpu += 7;
    ram += 5;
    disk += 3;
  }, 500);
});

let logCount = 3;

// Simulated server info for demonstration
function updateMcPlayers() {
  const playersText = serverInfo.players.length
    ? serverInfo.players.join(', ')
    : 'No players online';
  document.getElementById('mcPlayers').textContent = playersText;
}

function updateMcRamUsage() {
  const ramText = serverInfo.mcRamUsage;
  document.getElementById('mcRamUsage').textContent = ramText;

  const match = ramText.match(/([\d.]+)\s*GB\s*\/\s*([\d.]+)\s*GB/);
  if (match) {
    const used = parseFloat(match[1]);
    const total = parseFloat(match[2]);
    const percent = Math.round((used / total) * 100);
    const bar = document.getElementById('mcRamBar');
    if (bar) bar.style.width = `${percent}%`;
  }
}

function updateMcConsole() {
  const consoleElement = document.getElementById('mcConsole');
  consoleElement.innerHTML = serverInfo.consoleLogs
    .slice(-10) // only show last 10 logs
    .map(line => `<div>${line}</div>`)
    .join('');
  consoleElement.scrollTop = consoleElement.scrollHeight; // auto-scroll
}

setInterval(() => {
  // Simulate new log
  serverInfo.consoleLogs.push(`[12:0${logCount}] New log entry ${logCount}`);
  logCount++;

  // Simulate changing players
  serverInfo.players = ['Steve', 'Alex'].slice(0, logCount % 3);

  // Simulate RAM usage
  serverInfo.mcRamUsage = `${(Math.random() * 4 + 2).toFixed(1)} GB / 8 GB`;

  updateMcPlayers();
  updateMcRamUsage();
  updateMcConsole();
}, 5000);
