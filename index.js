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
    // userResource.id = shortid.generate()
    // resource.push(userResource)

    // res.status(201).json(userResource)

    //Option #3
    if(userResource.name === "" || userResource.bio === "") {
        res.status(400).json({ message: "Please provide name and bio" })
    } else {
        userResource.id = shortid.generate()
        resource.push(userResource)
        res.status(201).json(userResource)
    }

})

//GET array of users
server.get("/api/users", (req, res) => {
    res.status(200).json(resource)
})

//GET return user with specified id
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params
    let specifiedUser = resource.find(user => user.id === id)

    if(specifiedUser) {
        res.status(200).json(specifiedUser)
    } else {
        res.status(404).json({ message: "user with the specified id not found" })
    }
   
})

//DELETE user with specified id
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params
    const deleted = resource.find((user) => user.id === id)

    if(deleted) {
        resource = resource.filter((user) => user.id !== id)
        res.status(200).json(deleted)
    } else {
        res.status(404).json({ message: "id not found" })
    }
})

//PUT updates user with specified id
server.put("/api/users/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body

    let index = resource.findIndex(user => user.id === id)

    if (index !== -1) {
        changes.id = id
        resource[index] = changes
        res.status(200).json(changes)
    } else {
        res.status(404).json({ message: "user not found" })
    }
})


const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})