const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
require("./models/connection")
const userRoutes = require("./routes/userRoutes")
const eventRoutes = require("./routes/eventRoutes")
const ticketRoutes = require("./routes/ticketRoutes")
require('dotenv').config()

const PORT = 8000

app.use(cors({ origin: "*" }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use(userRoutes)
app.use(eventRoutes)
app.use(ticketRoutes)

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})