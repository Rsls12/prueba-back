import userRepository from '../repositories/Usuario.js';

const login =  async (payload) =>{
    const usuarios = await userRepository.findAll()

    const result = usuarios.find(x => x.nombredeusuario === payload.nombredeusuario &&
                                       x.password === payload.password);
    if(result)
        return result;
    else
        return null;
}

const userService = {login}

export default userService;