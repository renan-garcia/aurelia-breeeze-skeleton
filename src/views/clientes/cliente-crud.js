import { inject } from 'aurelia-dependency-injection';
import { computedFrom } from 'aurelia-framework';

import { ClienteRepositorio } from './cliente-repositorio';
import { CrudBase } from '../../resources/crud/crud-base'

@inject(ClienteRepositorio)
export class ClienteCrud extends CrudBase {
  _nome;
  constructor(...repositorio) {
    super(...repositorio);
  }

  @computedFrom('baseEntity.entidade')
  get title() {
    if (typeof (this.baseEntity.entidade) == 'undefined' && this.baseEntity.entidade == null) {
      return 'Novo Cliente';
    }
    let _nome = this.baseEntity.entidade.getProperty('Nome');
    return `Cliente ${_nome}`;
  }
}