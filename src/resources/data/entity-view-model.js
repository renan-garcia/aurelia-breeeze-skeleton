import { AppRouter } from 'aurelia-router';
import { inject } from 'aurelia-dependency-injection';
import { Estado } from '../crud/estados-crud/estado'

@inject(AppRouter, Estado)
export class EntityViewModel {
  genrenciadorDeEntidade;
  entidade;
  estado;

  constructor(router, estado, repositorio) {
    this.router = router;
    this.estado = estado;
    this.repositorio = repositorio;
  }

  atribuirEntidade(params) {
    var promise;
    // load or create the entity.
    if (params.id === 'new') {
      this.estado.criar();
      promise = this.repositorio.createNew();
    } else {
      this.estado.visualizar();
      promise = this.repositorio.loadExisting(params.id);
    }

    return promise.then(result => {
      this.genrenciadorDeEntidade = result.entityManager;
      this.entidade = result.entity;
    });
  }

  marcarAlteravel() {
    this.estado.alterar();
  }

  voltar() {
    this.router.navigateBack();
  }

  desativar() {
    this.entidade.entityAspect.setDeleted();
    this.genrenciadorDeEntidade.saveChanges()
      .then((saveSucceeded) => {
        console.log(saveSucceeded);
        this.voltar();
        Materialize.toast('Alterações salvas.', 2000);
      })
      .catch((saveFailed) => console.log(saveFailed));
  }

  canDeactivate() {
    // permit navigating away from new entities.
    if (this.entidade.entityAspect.entityState.isAdded()) {
      Materialize.toast('Novo registro cancelado.', 2000);
      return true;
    }

    // disallow navigating away from modified entities.
    if (this.hasChanges) {
      // throttle the amount of toast we pop.
      if (!this._lastPop || +new Date() - this._lastPop > 2000) {
        this._lastPop = +new Date();
        Materialize.toast('Navegação cancelada!Salve suas alterações antes.', 2000);
      }
      return false;
    }

    // permit navigating away from unmodified entities.
    return true;
  }

  foiAlterado() {
    return this.genrenciadorDeEntidade.hasChanges();
  }

  salvar() {
    if (this.genrenciadorDeEntidade.hasChanges()) {
      this.genrenciadorDeEntidade.saveChanges()
        .then((saveSucceeded) => {
          console.log(saveSucceeded);
          this.voltar();
          Materialize.toast('Alterações salvas.', 2000);
        })
        .catch((saveFailed) => console.log(saveFailed));
    }
  }

  reverter() {
    this.estado.visualizar();
    this.genrenciadorDeEntidade.rejectChanges();
    Materialize.toast('Alterações canceladas.', 2000)

    // workaround Materialize datepicker binding timezone issue.
    if (this.hasChanges) {
      this.genrenciadorDeEntidade.rejectChanges();
    }
  }
}
