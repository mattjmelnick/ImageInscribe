const path = require("path");
const { app, BrowserWindow, screen, Menu, ipcMain, dialog } = require("electron");

const createWindow = () => {
	// Detect if there is an external display
	let displays = screen.getAllDisplays();
	let externalDisplay = displays.find((display) => {
		return display.bounds.x !== 0 || display.bounds.y !== 0;
	});

	let win;
	// Create window on external display
	if (externalDisplay) {
		win = new BrowserWindow({
			x: externalDisplay.bounds.x + 300,
			y: externalDisplay.bounds.y + 150,
			width: 1300,
			height: 800,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false
			}
		});
	} else {
		// Create window on default display
		win = new BrowserWindow({
			width: 1300,
			height: 800,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false
			}
		});
	}
	win.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	})

// 	const template = [
// 		{
// 			label: "NonaGrid",
// 			submenu: [
// 				{role: "about"},
// 				{type: "separator"},
// 				{role: "services"},
// 				{type: "separator"},
// 				{role: "hide"},
// 				{role: "hideothers"},
// 				{role: "unhide"},
// 				{type: "separator"},
// 				{role: "quit"}
// 			]
// 		}
// 	];

// 	const menu = Menu.buildFromTemplate(template);
// 	Menu.setApplicationMenu(menu);
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// Prompt for a directory when clicking the button
ipcMain.on("open-folder-dialog", (event) => {
	dialog.showOpenDialog({
		properties: ["openDirectory"]
	}).then(result => {
		if (!result.canceled) {
			event.sender.send("selected-directory", result.filePaths[0]);
		}
	}).catch(err => {
		console.log(err);
	})
});