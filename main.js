const path = require("path");
const fs = require("fs");
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
			x: externalDisplay.bounds.x + (externalDisplay.bounds.width / 2) - 200,
			y: externalDisplay.bounds.y + (externalDisplay.bounds.height / 2) - 400,
			width: 400,
			height: 800,
			webPreferences: {
				nodeIntegration: false,
				contextIsolation: true,
				preload: path.join(__dirname, "preload.js"),
			},
		});
	} else {
		// Create window on default display
		win = new BrowserWindow({
			width: 400,
			height: 800,
			webPreferences: {
				nodeIntegration: false,
				contextIsolation: true,
				preload: path.join(__dirname, "preload.js"),
			},
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

// Get each image in the path
function getImagesInPath(path) {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				console.error("An error occurred:", err);
				reject(err);
			} else {
				const imageExtensions = [".jpeg", ".jpg", ".JPG", ".JPEG", ".png", ".svg", ".tiff", ".raw", ".rw2"];
				const imageFiles = files.filter(filename => {
					const extension = filename.slice(filename.lastIndexOf("."));
					return imageExtensions.includes(extension);
				});
				resolve(imageFiles);
			}	
		});
	});
}

// Prompt for a directory when clicking the button
ipcMain.handle("open-folder-dialog", async (event) => {
	const folder = await dialog.showOpenDialog({
		properties: ["openDirectory"],
	});
	let path = folder.filePaths[0];
	let listOfImages = await getImagesInPath(path);
	listOfImages.unshift(path);
	return listOfImages;
});