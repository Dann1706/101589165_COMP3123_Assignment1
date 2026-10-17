const { body, validationResult } = require("express-validator")
const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")

const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController")

const validateEmployee = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name is required"),

    body("email")
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("position")
        .trim()
        .notEmpty()
        .withMessage("Position is required"),

    body("salary")
        .isFloat({ min: 0 })
        .withMessage("Salary must be a positive number or zero"),

    body("date_of_joining")
        .isISO8601()
        .withMessage("Please provide a valid joining date"),

    body("department")
        .trim()
        .notEmpty()
        .withMessage("Department is required"),

    (request, response, next) => {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array()
            })
        }

        next()
    }
]

const validateEmployeeUpdate = [
    body("first_name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("First name cannot be empty"),

    body("last_name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Last name cannot be empty"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("position")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Position cannot be empty"),

    body("salary")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Salary must be a positive number or zero"),

    body("date_of_joining")
        .optional()
        .isISO8601()
        .withMessage("Please provide a valid joining date"),

    body("department")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Department cannot be empty"),

    (request, response, next) => {
        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array()
            })
        }

        next()
    }
]

router.post("/employees", protect, validateEmployee ,createEmployee)
router.get("/employees", protect, getAllEmployees)
router.get("/employees/:eid", protect, getEmployeeById)
router.put("/employees/:eid", protect, validateEmployeeUpdate, updateEmployee)
router.delete("/employees", protect, deleteEmployee)

module.exports = router