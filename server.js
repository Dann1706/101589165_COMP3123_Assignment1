console.log("SERVER.JS IS RUNNING")

require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const app = express()
const PORT = process.env.PORT || 8080

const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const errorHandler = require("./middleware/errorMiddleware")
const morgan = require("morgan")
const logger = require("./config/logger")

app.use(helmet())

const apiLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    limit : 100,
    standardHeaders : "draft-7",
    legacyHeaders : false,
    message : {
        message : 
            "Too many requests. Please try again later"
    }
})

app.use("/api/v1", apiLimiter)


app.use(express.json())

app.use(morgan("combined", {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}))


const userRoutes = require("./routes/userRoutes")
app.use("/api/v1/user", userRoutes)

const employeeRoutes = require("./routes/employeeRoutes")
app.use("/api/v1/emp", employeeRoutes)


app.get('/health', (request, response) => {
    response.status(200).json({
        status : 'OK',
        message : 'Server is running'
    })
})


const startServer = async () => {
    console.log("START SERVER FUNCTION CALLED")

    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
    
}

app.use(errorHandler)

startServer()
