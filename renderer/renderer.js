let getFolderButton = document.querySelector(".get-folder-button");
let pathOutput = document.querySelector(".path-output");
let numberOfImages = document.querySelector(".number-of-images");
let imageFileSection = document.querySelector(".image-file-section");
let imageArray = [];

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
		let imageFileDivObj = new imageFileDiv(listOfImages[i], i);
		imageArray.push(imageFileDivObj);
		// Create image file divs
		let imageFile = document.createElement("div");
		imageFile.classList.toggle("image-file");
		imageFileSection.appendChild(imageFile);
		imageFile.textContent = listOfImages[i];

		let textAreaArray = [];

		imageFileDivObj.createTextBoxWrapper();
		let textAreas = Array.from(document.querySelectorAll(".textbox"));
		// todo - create saveTextAreaContent

		imageFile.addEventListener("click", () => {
			let textBoxes = Array.from(document.querySelectorAll(".textbox-wrapper"));
			textBoxes.forEach(box => {
				box.style.display = "none";
			});
			imageFileDivObj.showTextbox();
		});
	}
});

class imageFileDiv {
	constructor(name, index) {
		this.name = name;
		this.index = index;
		this.textBoxWrapper = null;
		this.textBox = null;
	}

	createTextBoxWrapper() {
		this.textBoxWrapper = document.createElement("div");
		let upperTextBoxArea = document.createElement("div");
		let textBoxTitle = document.createElement("div");
		let closeButton = document.createElement("button");
		let lowerTextBoxArea = document.createElement("div");
		this.textBox = document.createElement("textarea");
		let buttonArea = document.createElement("div");
		let upButton = document.createElement("button");
		let downButton = document.createElement("button");

		this.textBoxWrapper.classList.toggle("textbox-wrapper");
		upperTextBoxArea.classList.toggle("upper-textbox-area");
		textBoxTitle.classList.toggle("textbox-title");
		closeButton.classList.toggle("close-button");
		lowerTextBoxArea.classList.toggle("lower-textbox-area");
		this.textBox.classList.toggle("textbox");
		buttonArea.classList.toggle("button-area");
		upButton.classList.toggle("up-button");
		downButton.classList.toggle("down-button");

		imageFileSection.appendChild(this.textBoxWrapper);
		this.textBoxWrapper.appendChild(upperTextBoxArea);
		this.textBoxWrapper.appendChild(lowerTextBoxArea);
		upperTextBoxArea.appendChild(textBoxTitle);
		upperTextBoxArea.appendChild(closeButton);
		lowerTextBoxArea.appendChild(this.textBox);
		lowerTextBoxArea.appendChild(buttonArea);
		buttonArea.appendChild(upButton);
		buttonArea.appendChild(downButton);

		closeButton.textContent = 'X';
		closeButton.addEventListener("click", () => {
			this.textBoxWrapper.style = "none";
		});

		upButton.textContent = '^';
		downButton.textContent = 'v';
	}

	showTextbox() {
		if (this.textBoxWrapper) {
			this.textBoxWrapper.style.display = "inline-block";
			let textBoxTitle = this.textBoxWrapper.querySelector(".textbox-title");
			textBoxTitle.textContent = "";
			textBoxTitle.textContent = this.name;
		}
	}

	saveTextAreaContent() {

	}
}