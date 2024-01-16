const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
	selectFolder: async () => {
		const result = await ipcRenderer.invoke("open-folder-dialog");
		return result;
	},
});