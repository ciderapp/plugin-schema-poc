const path = require("path")
const {ipcMain} = require("electron")


module.exports = class V2Plugin {
    constructor(env) {
        // Define plugin enviornment within the class
        this.env = env
    }

    // Called when the backend is ready
    onReady(win) {
        console.log("=== Backend Plugin Loaded ===")

        // Setting up an ipcMain channel for front end to communicate with
        ipcMain.handle("plugin.frontendComm", (event, message) => {
            // Print out what the front end says
            console.debug(`Frontend says: ${message}`)
            // Get the main window and send a messsage to it
            this.env.utils.getWindow().webContents.send("plugin.backendComm", "Hello from the backend!")
        })
    }

    // Called when the renderer is ready (app.init())
    onRendererReady(win) {
        console.debug("Renderer Ready Called")
        // Load the frontend plugin
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "index.frontend.js"))
    }
}
