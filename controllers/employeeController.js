const { model } = require("mongoose")
const Employee = require("../models/Employee")
const mongoose = require("mongoose")

const createEmployee = async (request, response, next) => {
    try{
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = request.body

        const employee = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
            user: request.user.id
        })

        return response.status(201).json({
            message : "Employee created successfully",
            employee
        })

    } catch(error){
        next(error)
    }
}


const getAllEmployees = async (request,response, next) => {
    try{
        const employees = await Employee.find({
            user : request.user.id
        })

        return response.status(200).json({
            employees
        })

    } catch(error){
        next(error)
    }
}


const getEmployeeById = async (request, response, next) => {
    try{
        const { eid } = request.params

        if (!mongoose.isValidObjectId(eid)){
            return response.status(400).json({
                message : "Invalid employee ID"
            })
        }

        const employee = await Employee.findOne({
            _id : eid,
            user : request.user.id
        })

        if(!employee){
            return response.status(404).json({
                message : "Employee not found"
            })
        }

        return response.status(200).json({
            employee
        })

    } catch(error){
        next(error)
    }
}


const updateEmployee = async (request,response,next) => {
    try{
        const { eid } = request.params

        if(!mongoose.isValidObjectId(eid)){
            return response.status(400).json({
                message : "Invalid employee ID"
            })
        }

        const allowedFields = [
            "first_name",
            "last_name",
            "email",
            "position",
            "salary",
            "date_of_joining",
            "department"        
        ]

        const updates = {}

        for (const field of allowedFields){
            if (Object.prototype.hasOwnProperty.call(request.body, field)){
                updates[field] = request.body[field]
            }
        }

        if (Object.keys(updates).length === 0 ){
            return response.status(400).json({
                message : "No valid fields provided for update"
            })
        }

        const employee = await Employee.findOneAndUpdate(
            { _id: eid, user: request.user.id},
            { $set: updates},
            { new: true, runValidators: true}
        )

        if (!employee){
            return response.status(404).json({
                message : "Employee not found"
            })
        }

        return response.status(200).json({
            message : "Employee updated successfully",
            employee
        })

    } catch(error){
        next(error)
    }
}


const deleteEmployee = async (request, response, next) => {
    try {
        const { eid } = request.query

        if (!mongoose.isValidObjectId(eid)) {
            return response.status(400).json({
                message: "Invalid employee ID"
            })
        }

        const employee = await Employee.findOneAndDelete({
            _id: eid,
            user: request.user.id
        })

        if (!employee) {
            return response.status(404).json({
                message: "Employee not found"
            })
        }

        return response.status(200).json({
            message : "Employee has been deleted successfully",
            employee
        })

    } catch (error) {
        next(error)
    }
}





module.exports = {  createEmployee, 
                    getAllEmployees,
                    getEmployeeById, 
                    updateEmployee,
                    deleteEmployee 
                }