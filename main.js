const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs/promises');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Secure preload file
            contextIsolation: true, // Security best practice
        },
    });

    mainWindow.loadFile('index.html'); // Load the app's HTML
});

// Handle directory picking
ipcMain.handle('pick-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'], // Open directories only
    });

    if (result.canceled) {
        return { error: 'No directory selected' };
    }

    const directoryPath = result.filePaths[0];

    try {
        const files = await fs.readdir(directoryPath, { withFileTypes: true });
        return files.map((file) => ({
            name: file.name,
            kind: file.isFile() ? 'file' : 'directory',
        }));
    } catch (err) {
        return { error: err.message };
    }
});
