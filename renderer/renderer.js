let getFolderButton = document.querySelector(".get-folder-button");
let pathOutput = document.querySelector(".path-output");
let numberOfImages = document.querySelector(".number-of-images");
let imageFileSection = document.querySelector(".image-file-section");

// Send choice to main process to get path
getFolderButton.addEventListener("click", async () => {
	const listOfImages = await window.api.selectFolder();
	// Clear display area
	if (imageFileSection.hasChildNodes) {
		while (imageFileSection.firstChild) {
			imageFileSection.removeChild(imageFileSection.firstChild);
		}
	}
	// Get path from first index
	let folderPath = listOfImages.shift();
	// Allow for word breaks at "/"
	folderPath = folderPath.replaceAll("/", "/<wbr>");
	pathOutput.innerHTML = "";
	// Wrap in span to adjust for path length
	pathOutput.innerHTML = "<span>" + folderPath + "<span>";
	numberOfImages.textContent = listOfImages.length + " Images";
	// Create image file sections for each element
	for (let i = 0; i < listOfImages.length; i++) {
		let imageFile = document.createElement("div");
		imageFile.classList.toggle("image-file");
		imageFile.textContent = listOfImages[i];
		imageFileSection.appendChild(imageFile);
	}
});