let getFolderButton = document.querySelector(".get-folder-button");
let pathOutput = document.querySelector(".path-output");
let selectedDirectory;

// Send choice to main process to get path
getFolderButton.addEventListener("click", async () => {
	const listOfImages = await window.api.selectFolder();
	let folderPath = listOfImages.shift();
	console.log(folderPath);
	pathOutput.innerHTML = "";
	pathOutput.innerHTML = folderPath + "<br>" + listOfImages.length + "<br>";
	for (let i = 1; i < listOfImages.length; i++) {
		pathOutput.innerHTML = pathOutput.innerHTML + listOfImages[i] + "<br>";
	}
});