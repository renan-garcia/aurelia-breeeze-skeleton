/**
* The shell for the orders section of the application.  Will contain either
* the order-list or order page.
*/
export class ClientesSection {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './cliente-list', nav: false, title: '' },
      { route: ':id', moduleId: './cliente-crud',      nav: false, title: '' },
    ]);
  }
}
