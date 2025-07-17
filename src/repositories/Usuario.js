import {Usuario} from '../models/index.js';
import RepositoryBase from '../repositories/base.js';

const repository = new RepositoryBase(Usuario);

export default repository;