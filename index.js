const express = require("express")
const shortid = require("shortid")

const server = express()

server.use(express.json())

let resource = []

//Testing if server runs
server.get("/", (req, res) => {
    res.json({ message: "Hello World!" })
})

//POST create a user
server.post("/api/users", (req, res) => {

    // const userData = {
    //         id: "",
    //         name: "Jane Doe", 
    //         bio: "Not Tarzan's Wife, another Jane"
    // }

    const userResource = req.body

    //Option #1
    // function validateBody(body) {
    //     return true
    // }

    // if (validateBody(body)) {
    //     userResource.id = shortid.generate()
    //     resource.push(userResource)
    //     res.status(201).json(userResource)
    // } else {
    //     res.status(400).json({ message: "The object requested is not valid" })
    // }

    //Option #2
    userResource.id = shortid.generate()
    resource.push(userResource)

    res.status(201).json(userResource)

})

//GET array of users
server.get("/api/users", (req, res) => {
    res.status(200).json(resource)
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})