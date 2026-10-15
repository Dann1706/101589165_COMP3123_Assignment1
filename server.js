const express = require("express")
const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())

app.get('/health', (request, response) => {
    response.status(200).json({
        status : 'OK',
        message : 'Server is running'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
