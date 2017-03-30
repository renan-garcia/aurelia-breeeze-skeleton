import Alteracao from './alteracao';
import Criacao from './criacao';
import Visualizacao from './visualizacao';

export class Estado {
  atual;

  alterar() {
    this.atual = new Alteracao();
  }

  criar() {
    this.atual = new Criacao();
  }

  visualizar() {
    this.atual = new Visualizacao();
  }
}
