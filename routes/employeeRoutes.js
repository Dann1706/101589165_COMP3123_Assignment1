const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")

router.get("/employees", protect, (request, response)=> {
    response.status(200).json({
        message : "Authentication successful",
        userId : request.user.id
    })
})

module.exports = router