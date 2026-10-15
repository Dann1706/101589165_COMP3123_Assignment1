const User = require("../models/User")
const bcrypt = require("bcryptjs")

const signup = async (request,response,next) => {
    try{
        const { username, email, password} = request.body

        if(!username || !email || !password){
            return response.status(400).json({
                message : "All fields are required!"
            })
        }

        if (typeof username !== "string" || username.trim().length < 3){
            return response.status(400).json({
                message : "Username must be at least 3 characters!"
            })
        } 

        if (typeof email !== "string" ||  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return response.status(400).json({
                message: "Invalid email format"
            });
        }

        
        if (typeof password !== "string" || password.length < 8){
            return response.status(400).json({
                message : "Password must be at least 8 characters"
            })
        }

        const existingUser = await User.findOne({
            $or : [
                { username : username.trim()},
                { email : email.trim().toLowerCase()}
            ]
        })

        if (existingUser){
            return response.status(409).json({
                message : "Username or email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username : username.trim(),
            email : email.trim().toLowerCase(),
            password : hashedPassword
        })

        return response.status(201).json({
            message : "User has been registered successfully",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
        
    } catch (error){
        next(error)
    }
}

module.exports = { signup }