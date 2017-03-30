import { Factory, inject } from 'aurelia-dependency-injection';
import { computedFrom } from 'aurelia-framework';

import { EntityViewModel } from '../data/entity-view-model';

@inject(Factory.of(EntityViewModel))
export class CrudBase {
  constructor(service, ...factoryEntityViewModel) {
    this.baseEntity = factoryEntityViewModel[0](service);
  }

  activate(params) {
    this.baseEntity.atribuirEntidade(params);
  }

  @computedFrom('baseEntity.entidade')
  get entidade() {
    return this.baseEntity.entidade;
  }

  @computedFrom('baseEntity.estado.atual')
  get estado_crud() {
    return this.baseEntity.estado.atual;
  }
};
