const { body, validationResult } = require("express-validator")
const express = require("express")
const router = express.Router()

const { signup, login } = require("../controllers/userController")

const validateSignup = [
    body("username")
        .trim()
        .isLength({ min : 3 })
        .withMessage("Username must be at least 3 characters"),

    body("email")
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),

    (request,response,next) => {
        const errors = validationResult(request)

        if(!errors.isEmpty()){
            return response.status(400).json({
                errors : errors.array()
            })
        }

        next()
    }
]


router.post("/signup",validateSignup ,signup)
router.post("/login", login)

module.exports = router