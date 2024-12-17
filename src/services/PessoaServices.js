const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculasService = new Services('Matricula');
  }

  async pegaMatriculasAtivaPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(estudanteId) {
    await super.atualizaRegistro({ ativo: false }, { id: estudanteId });
    await this.matriculasService.atualizaRegistro(
      { status: 'cancelado' },
      { estudante_id: estudanteId }
    );
  }
}

module.exports = PessoaServices;