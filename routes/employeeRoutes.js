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

router.post("/employees", protect, createEmployee)
router.get("/employees", protect, getAllEmployees)
router.get("/employees/:eid", protect, getEmployeeById)
router.put("/employees/:eid", protect, updateEmployee)
router.delete("/employees", protect, deleteEmployee)

module.exports = router