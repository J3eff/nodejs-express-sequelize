const { Op } = require('sequelize');
const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    //se existerem os param, criar um prop {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    //se existir data inicial, adiciona a prop gte
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    //se existir data final, idem
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = CursoController;