export function addObjecKey(obj, key, value) {
  if (Object.prototype.toString.call(obj) != "[object Object]") {
    return;
  }

  obj[key] =
    Object.prototype.toString.call(value) == "[object Function]"
      ? value()
      : value;

  Array.isArray(obj.children) &&
    obj.children.map((_obj) => addObjecKey(_obj, key, value));

  return obj;
}

export function getNodeById(data, id) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item.id == id) {
      return item;
    }

    if (Array.isArray(item.children)) {
      let value = getNodeById(item.children, id);
      if (value) {
        return value;
      }
    }
  }
}

export function getNodeByIdAndDel(data, id) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item.id == id) {
      data.splice(i, 1);
      return item;
    }

    if (Array.isArray(item.children)) {
      let value = getNodeByIdAndDel(item.children, id);
      if (value) {
        return value;
      }
    }
  }
}

export function getNodeByIdAndMarkNext(data, id) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item.id == id) {
      data[i] = "next";
      return item;
    }

    if (Array.isArray(item.children)) {
      let value = getNodeById(item.children, id);
      if (value) {
        return value;
      }
    }
  }
}

export function setNodeByIdAndInsert(data, id, value, type) {
  if (!value) {
    return data;
  }

  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item.id == id) {
      if (type == "insertBefore") {
        data.splice(i, 0, value);
      } else if (type == "appendAfter") {
        data.splice(i + 1, 0, value);
      } else if (type == "appendChild") {
        if (data[i].children) {
          data[i].children.push(value);
        } else {
          data[i].children = [value];
        }
      }

      break;
    }

    if (Array.isArray(item.children)) {
      setNodeByIdAndInsert(item.children, id, value, type);
    }
  }
}

export function setNodeByNext(data, value) {
  if (!value) {
    return data;
  }

  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item == "next") {
      data[i] = value;

      break;
    }

    // if (Array.isArray(item.children)) {
    //   let value = setNodeById(item.children, id);
    //   if (value) {
    //     break;
    //   }
    // }
  }

  return data;
}
