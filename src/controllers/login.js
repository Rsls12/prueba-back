import userService from "../services/login.js" 
    
const login = async (req, res) => {
    const { nombredeusuario, password } = req.body;
    const result = await userService.login({ nombredeusuario, password });

    return sendResults(result,res)
}

const sendResults = (result, res) =>{
    if(result)
        return res.status(200).json(result);
    else
        return res.status(500).json({message: "Ha ocurrido un error"})
}

const loginControler = {login}

export default loginControler;