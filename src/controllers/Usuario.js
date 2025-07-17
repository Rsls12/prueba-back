import repository from '../repositories/Usuario.js'

const findAll = async (req, res) =>{

    const result = await repository.findAll();

    return sendResults(result,res);

  
}

const findOne = async (req, res) =>{
    const id = req.params.id;
    const result = await repository.findOne(id);

    return sendResults(result,res);

}

const create =async (req, res) =>{
    const payload = req.body;

    const result = await repository.create(payload)

    return sendResults(result,res)
}

const update =async (req,res) =>{
    const payload = req.body;

    const result = await repository.update(payload);

    return sendResults(result,res)
}

const remove = async (req, res) =>{
    const id = req.params.id;
    const result = await repository.remove(id);

    return sendResults(result,res);

}

const findByUsername = async (req, res) => {
    const { email } = req.query; // Espera 'email' como parámetro de consulta
    
    if (!email) {
        // Si no se proporciona el parámetro 'email', envía un error 400
        return res.status(400).json({ message: 'El parámetro "email" es requerido.' });
    }

    try {
        const result = await repository.findOneByUsername(email); // Llama al método del repositorio

        // Aquí es donde ajustamos:
        // Si 'result' es null (lo que devuelve tu repositorio si no encuentra o hay un error),
        // sendResults se encargará de enviarlo como un 500 genérico.
        // Si 'result' encuentra un usuario, sendResults lo enviará como 200.
        // ADVERTENCIA DE SEGURIDAD: Esto aún devolverá la contraseña si se encuentra.
        return sendResults(result, res);

    } catch (error) {
        // En caso de un error inesperado durante la operación del repositorio
        console.error('Error en findByUsername del controlador:', error);
        // Aunque sendResults manejará el 'null' si viene del repo,
        // este catch es para errores más catastróficos antes de llegar a sendResults.
        // Aquí podríamos ser más específicos o simplemente dejar que sendResults lo maneje si devuelve null.
        return res.status(500).json({ message: 'Ha ocurrido un error interno al buscar usuario.' });
    }
};

const sendResults = (result, res) =>{
    if(result)
        return res.status(200).json(result);
    else
        return res.status(500).json({message: "Ha ocurrido un error"})
}

const controller = { findAll, findOne, create, update, remove, findByUsername }
export default controller;