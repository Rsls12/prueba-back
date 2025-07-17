import repository from '../repositories/categoria.js';

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
  const payload = req.body;
  const result = await repository.create(payload);
  return sendResults(result, res);
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

const controller = {findAll, findOne, create, update, remove};
export default controller;