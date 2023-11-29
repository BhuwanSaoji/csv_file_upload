const cron = require("node-cron"); 


exports.routes = (app) => {
    const userController = require("./controller/userController");

    cron.schedule("* * * * *", ()=>{
        userController.readFile()
    })

    
    app.get("/", (req, res) => {
        return res.status(200).send("Health check successful")
    })

    app.post("/upload_users", async (req, res) => {
        try {
            let result = await userController.uploadUsers(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send("Internal Server error")
        }
    })


    app.get("/get_users", async (req, res) => {
        try {
            let result = await userController.getAllUsers(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send("Internal Server error")
        }
    })


}