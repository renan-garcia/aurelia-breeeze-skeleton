import {ListViewModel} from '../list-view-model';
import {inject, singleton} from 'aurelia-dependency-injection';
import {AppRouter} from 'aurelia-router';
import {ClienteService} from './cliente-service';

@inject(AppRouter, ClienteService)
@singleton()
export class ClienteList extends ListViewModel {
  constructor(router, service) {
    super('clientes', router, service)
  }
}
