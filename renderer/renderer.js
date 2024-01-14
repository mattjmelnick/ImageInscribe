const { ipcRenderer } = require("electron");
const fs = require("fs");

let getFolderButton = document.querySelector(".get-folder-button");
let pathOutput = document.querySelector(".path-output");
let selectedDirectory;

// Send choice to main process to get path
getFolderButton.addEventListener("click", () => {
	ipcRenderer.send("open-folder-dialog");
});

// Get each item in the path
function getItemsInPath(path) {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				console.error("An error occurred:", err);
				reject(err);
			} else {
				// Subtract 1 for a hidden file on MacOs
				resolve(files.length <= 0 || files.length === 1 ? files.length : files.length - 1);
			}
		});
	});
}

// Listen for the selected directory from the main process
ipcRenderer.on("selected-directory", (event, path) => {
	getItemsInPath(path).then(numberofItems => {
		console.log(numberofItems);
		selectedDirectory = path;
		pathOutput.textContent = selectedDirectory + " " + numberofItems;
	}).catch(err => {
		console.error("An error has occurred:", err);
	});
});