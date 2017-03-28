export class EntityViewModel {
  service;
  entityManager;
  entity;
  isChangeable;
  
  

  constructor(service, router) {
    this.service = service;
    this.router = router;
  }

  activate(info) {
    var promise;
    this.isChangeable = false;
    // load or create the entity.
    if (info.id === 'new') {
      this.isChangeable = true;
      promise = this.service.createNew();
    } else {
      promise = this.service.loadExisting(info.id);
    }

    return promise.then(result => {
      this.entityManager = result.entityManager;
      this.entity = result.entity;
    });
  }

  setChangeable() {
    this.isChangeable = true;
  }

  back() {
    

    this.router.navigateBack();
  }

  disable() {
    this.entity.entityAspect.setDeleted();
    this.entityManager.saveChanges()
      .then((saveSucceeded) => {
          console.log(saveSucceeded);
          this.back();
          Materialize.toast('Alterações salvas.', 2000);
      })
      .catch((saveFailed) => console.log(saveFailed));
  }

  canDeactivate() {
    // permit navigating away from new entities.
    if (this.entity.entityAspect.entityState.isAdded()) {
      Materialize.toast('Add-new cancelled.', 2000);
      return true;
    }

    // disallow navigating away from modified entities.
    if (this.hasChanges) {
      // throttle the amount of toast we pop.
      if (!this._lastPop || +new Date() - this._lastPop > 2000) {
        this._lastPop = +new Date();
        Materialize.toast('Navigation cancelled.  Save your changes!', 2000);
      }
      return false;
    }

    // permit navigating away from unmodified entities.
    return true;
  }

  get hasChanges() {
    return this.entityManager.hasChanges();
  }

  save() {
    if (this.entityManager.hasChanges()) {
      this.entityManager.saveChanges()
        .then((saveSucceeded) => {
          console.log(saveSucceeded);
          this.back();
          Materialize.toast('Alterações salvas.', 2000);
        })
        .catch((saveFailed) => console.log(saveFailed));
    }
  }

  revert() {
    this.isChangeable = false;
    this.entityManager.rejectChanges();
    Materialize.toast('Changes reverted.', 2000)

    // workaround Materialize datepicker binding timezone issue.
    if (this.hasChanges) {
      this.entityManager.rejectChanges();
    }
  }
}
