import breeze from 'breeze';
import settings from '../../resources/data/settings';
import { createEntityManager } from '../../resources/data/entity-manager-factory';

export class ClienteRepositorio {
  getPage(pageIndex) {
    var query = new breeze.EntityQuery
      .from('Clientes')
      .select('Id, Nome, Sobrenome')
      .orderByDesc('Nome')
      .skip(pageIndex * settings.pageSize)
      .take(settings.pageSize)
      .inlineCount();

    return createEntityManager()
      .then(em => em.executeQuery(query))
      .then(queryResult => {
        return {
          entities: queryResult.results,
          pageCount: 8, //Math.ceil(queryResult.inlineCount / this.pageSize);
        };
      });
  }

  loadExisting(id) {
    var clienteQuery = new breeze.EntityQuery().from('Clientes').where('Id', '==', id);
    return createEntityManager()
      .then(em => Promise.all([em.executeQuery(clienteQuery)]))
      .then(values => {
        var queryResult = values[0];
        return {
          entity: queryResult.results[0],
          entityManager: queryResult.entityManager
        };
      });
  }

  createNew() {
    return createEntityManager()
      .then(em => {
        return {
          entity: em.createEntity('Cliente'),
          entityManager: em
        };
      });
  }
}
