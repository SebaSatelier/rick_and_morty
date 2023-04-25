const users = require('../utils/users')

const getLogin = (request,response)=>{
    const {email,password} = request.query
    const userLogin = users.find(user => user.email === email && user.password === password)
    if(userLogin){
        return response.status(200).json({access:true})
    }
    return response.status(200).json({access:false})
}

module.exports = {
    getLogin
}