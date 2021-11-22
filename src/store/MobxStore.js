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

    this._delPageDsl(page, id);
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
      props[prop.name] = prop.value;
    });

    const item = {
      id: componentItem.componentName + "_" + nanoid(),
      componentName: componentItem.componentName,
      props,
    };

    this.dsl.page.push(item);

    return item;
  }

  getPageDSL(id) {
    const page = this.dsl?.page || [];

    return this._getPageDSL(page, id);
  }

  _getPageDSL(dsl, id) {
    for (let i = 0; i < dsl?.length; i++) {
      const item = dsl[i];

      if (item?.id == id) {
        return item;
      }

      if (Array.isArray(item.children)) {
        const findSubItem = this._getPageDSL(item.children, id);

        if (findSubItem) {
          return findSubItem;
        }
      }
    }
  }

  setPageDslProp(name, value, id) {
    const page = this.dsl?.page || [];

    this._setPageDslProp(page, name, value, id);
  }

  _setPageDslProp(dsl, name, value, id) {
    for (let i = 0; i < dsl?.length; i++) {
      const item = dsl[i];

      if (item?.id == id) {
        item.props[name] = value;
        return;
      }

      if (Array.isArray(item.children)) {
        const findSubItem = this._setPageDslProp(
          item.children,
          name,
          value,
          id
        );

        if (findSubItem) {
          return findSubItem;
        }
      }
    }
  }
}
