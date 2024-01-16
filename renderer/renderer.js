let getFolderButton = document.querySelector(".get-folder-button");
let pathOutput = document.querySelector(".path-output");
let selectedDirectory;

// Send choice to main process to get path
getFolderButton.addEventListener("click", async () => {
	const folderPath = await window.api.selectFolder();
	pathOutput.innerHTML = "";
	folderPath.forEach(image => {
		pathOutput.innerHTML = pathOutput.innerHTML + image + "<br>";
	});
});