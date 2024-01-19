let getFolderButton = document.querySelector(".get-folder-button");
let pathOutput = document.querySelector(".path-output");
let numberOfImages = document.querySelector(".number-of-images");

// Send choice to main process to get path
getFolderButton.addEventListener("click", async () => {
	const listOfImages = await window.api.selectFolder();
	let folderPath = listOfImages.shift();
	folderPath = folderPath.replaceAll("/", "/<wbr>");
	pathOutput.innerHTML = "";
	pathOutput.innerHTML = "<span>" + folderPath + "<span>";
	numberOfImages.textContent = listOfImages.length + " Images";
	// for (let i = 1; i < listOfImages.length; i++) {
	// 	pathOutput.innerHTML = pathOutput.innerHTML + listOfImages[i] + "<br>";
	// }
});