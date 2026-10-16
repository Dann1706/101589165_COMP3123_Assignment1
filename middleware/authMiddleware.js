const jwt = require("jsonwebtoken")

const protect = (request, response, next) => {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")){
        return response.status(401).json({
            message : "Access denied. No token provided"
        })
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        request.user = {
            id : decoded.userId
        }

        next()
    } catch(error){
        return response.status(401).json({
            message : "Invalid or expired token"
        })
    }
}

module.exports = protect