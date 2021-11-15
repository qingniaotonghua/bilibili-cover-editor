import { makeObservable, observable, action, computed } from "mobx";
import { nanoid } from "nanoid";

export default class {
  dsl = { page: [] };
  constructor(dsl = { page: [] }) {
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

  delPageDsl(id) {
    const page = this.dsl?.page || [];

    console.log(this._delPageDsl(page, id));
  }

  _delPageDsl(dsl, id) {
    for (let i = 0; i < dsl?.length; i++) {
      const item = dsl[i];

      if (item?.id == id) {
        return dsl.splice(i, 1)[0];
      }

      if (Array.isArray(item.children)) {
        const findSubItem = this._delPageDsl(item.children, id);

        if (findSubItem) {
          return findSubItem;
        }
      }
    }
  }

  addPageDSL(componentItem) {
    const props = {};

    componentItem.props?.map((prop) => {
      props[prop.name] = prop.initialValue;
    });

    this.dsl.page.push({
      id: componentItem.componentName + "_" + nanoid(),
      componentName: componentItem.componentName,
      props,
    });
  }

  _getDSLById(id, dsl) {
    for (let i = 0; i < dsl.length; i++) {
      const item = dsl[i];

      if (item.id == id) {
        return item;
      }

      if (Array.isArray(item.children)) {
        const findSubItem = getDSLById(id, item.children);

        if (findSubItem) {
          return findSubItem;
        }
      }
    }

    return null;
  }
}
