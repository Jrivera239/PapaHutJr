const DEBUG = true;

function enableDebugMode() {
    if (!DEBUG) return;

    // Add debug button to page
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Debug Tools';
    debugButton.style.position = 'fixed';
    debugButton.style.bottom = '10px';
    debugButton.style.right = '10px';
    debugButton.onclick = showDebugMenu;
    document.body.appendChild(debugButton);
}

function showDebugMenu() {
    const actions = [
        { name: 'Clear Cart', action: () => localStorage.removeItem('cart') },
        { name: 'Reset Menu', action: () => localStorage.removeItem('menu') },
        { name: 'Show LocalStorage', action: () => console.table(localStorage) },
        { name: 'Run Tests', action: () => runTests() }
    ];

    const menu = actions.map((item, index) => 
        `${index + 1}: ${item.name}`
    ).join('\n');

    const choice = prompt(`Debug Menu:\n${menu}\n\nEnter number:`);
    if (choice && actions[choice - 1]) {
        actions[choice - 1].action();
        location.reload();
    }
}

// Add to all pages
document.addEventListener('DOMContentLoaded', enableDebugMode); 