import repository from '../repositories/producto.js';
import Producto from '../models/producto.js';

const sendResults = (result, res) => {
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ error: 'No encontrado' });
  }
};

const findAll = async (req, res) => {
  const result = await repository.findAll();
  return sendResults(result, res);
};

const findOne = async (req, res) => {
  const id = req.params.id;
  const result = await repository.findOne(id);
  return sendResults(result, res);
};

const create = async (req, res) => {
  try {
    const {
      name,
      presentation,
      category,
      description,
      stock,
      image
    } = req.body;

    let imagen = null;

    if (req.file) {
      // Construye la URL completa de la imagen
      imagen = `http://localhost:3001/uploads/${req.file.filename}`;
    }

    const nuevoProducto = await Producto.create({
      nombre: name,
      idCategoria: category,
      descripcion: description,
      stock: stock,
      imagen: imagen,
      marca: "Productos genéricos SAC",
      precio: 5
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error en create producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

const update = async (req, res) => {
  const payload = req.body;
  const result = await repository.update(payload);
  return sendResults(result, res);
};

export const remove = async (req, res) => {
  const id = req.params.id;
  const result = await repository.remove(id);
  return sendResults(result, res);
};

const findWithCategoria = async (req, res) => {
  const id = req.params.id;
  const result = await repository.findWithCategoria(id);
  return sendResults(result, res);
};

const findAllWithCategorias = async (req, res) => {
  const result = await repository.findAllWithCategorias();
  return sendResults(result, res);
};

const controller = {findAll, findOne, create, update, remove, findWithCategoria, findAllWithCategorias};
export default controller;