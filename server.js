require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const app = express()
const PORT = process.env.PORT || 8080


app.use(express.json())

app.get('/health', (request, response) => {
    response.status(200).json({
        status : 'OK',
        message : 'Server is running'
    })
})


const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
    
}

startServer()
