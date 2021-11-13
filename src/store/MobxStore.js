import {makeAutoObservable} from 'mobx'

export default new class {

  constructor() {    
    this.dsl = "";
    makeAutoObservable(this);
  }  
}