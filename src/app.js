import {inject} from 'aurelia-dependency-injection';
import {Lookups} from './lookups';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Lookups, EventAggregator)
export class App {
  constructor(lookups, events) {
    this.lookups = lookups;

    // subscribe to the router's navigation complete event.
    events.subscribe('router:navigation:complete', this.navigationComplete);
  }

  configureRouter(config, router) {
    config.title = 'Northwind';
    config.map([
      { route: '', redirect: 'clientes' },
      { route: 'clientes',    moduleId: './clientes/clientes-section',       nav: true, title: 'Clientes' },
    ]);
    this.router = router;
  }

  activate() {
    return this.lookups.load();
  }

  navigationComplete(navigationInstruction) {
    // Enable the materialize "waves" effect on the new page.
    Waves.displayEffect()

    // Track page-views with google-analytics.
    //ga('send', 'pageview', '/' + navigationInstruction.fragment);
  }
}
