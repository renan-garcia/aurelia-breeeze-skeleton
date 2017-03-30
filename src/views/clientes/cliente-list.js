import {ListViewModel} from '../../resources/data/list-view-model';
import {inject, singleton} from 'aurelia-dependency-injection';
import {AppRouter} from 'aurelia-router';
import {ClienteRepositorio} from './cliente-repositorio';

@inject(AppRouter, ClienteRepositorio)
@singleton()
export class ClienteList extends ListViewModel {
  constructor(router, repositorio) {
    super('clientes', router, repositorio)
  }
}
