import {EntityViewModel} from '../entity-view-model';
import {inject} from 'aurelia-dependency-injection';
import {ClienteService} from './cliente-service';
import {Lookups} from '../lookups';
import {AppRouter} from 'aurelia-router';


@inject(ClienteService, Lookups, AppRouter)
export class Cliente extends EntityViewModel {

  constructor(service, lookups, appRouter) {
    super(service, appRouter);
  }

  get title() {
    if (this.entity.Id <= 0) {
      return 'Novo Cliente';
    }
    return `Cliente #${this.entity.Id}`;
  }
}
