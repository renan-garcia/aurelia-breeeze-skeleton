import settings from './settings';

export class ListViewModel {
  router;
  route;
  repositorio;
  entities = [];
  pageSize = settings.pageSize;
  pageCount = 0;
  pageIndex = 0;
  isLoading = false;

  constructor(route, router, repositorio) {
    this.route = route;
    this.router = router;
    this.repositorio = repositorio;
  }

  activate() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.repositorio.getPage(this.pageIndex)
      .then(result => {
        this.entities = result.entities;
        this.pageCount = result.pageCount;
        this.isLoading = false;
      });
  }

  setPage(index) {
    this.pageIndex = index;
    this.load();
  }

  open(id) {
    this.router.navigate(this.route + '/' + id);
  }
}
