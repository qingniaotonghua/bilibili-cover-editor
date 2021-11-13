import { makeObservable, observable, action, computed } from "mobx";

export default class {
  dsl = {};
  constructor(dsl = {}) {
    makeObservable(this, {
      dsl: observable,
      setDSL: action,
    });

    this.dsl = dsl;
  }

  setDSL(dsl) {
    this.dsl = dsl;
  }

  getDSLById(id) {}

  setDSLById(id, value) {}

  setDSLPropValueById(id, prop, value) {}

  getDSLPropValueById(id, prop) {}
}
