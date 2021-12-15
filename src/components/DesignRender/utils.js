import React from "react";
import { toLower } from "lodash";

// 递归渲染 Schema
function renderStyle(schema) {
  if (!schema) {
    return "";
  }

  const result = [];

  (Array.isArray(schema) ? schema : [schema]).map((item) => {
    if (item?.props?.css && item.id) {
      result.push({
        id: item.id,
        css: item.props.css.replace(":root", `.${item.id}`),
      });
      result.concat(renderStyle(item.children));
    }
  });

  return result;
}

// 解析props
function parseProps(props, context) {
  const result = {};

  Object.keys(props).map((key) => {
    result[key] = props[key];
  });

  return result;
}

// 渲染 Schema
function renderSchema(schema, components, context, props = {}) {
  if (!schema) {
    return null;
  }

  return (Array.isArray(schema) ? schema : [schema]).map((item, key) => {
    if (item.componentName) {
      // 如果 children 只是一个字符串的话，不进行任何包装
      return React.createElement(
        components?.get(item.componentName)?.view ||
          toLower(item.componentName),
        {
          ...parseProps(item.props || {}, context),
          className: item.id,
          key,
          __componentName: item.componentName,
          __id: item.id,
          ...props,
        },
        renderSchema(item.children, components, context, props)
      );
    }

    return item; // 直接反回字符串
  });
}

// 添加样式
function appendStyle({ id, css }) {
  const _oldEl = document.getElementById("style-" + id);
  if (_oldEl) {
    _oldEl.innerHTML = css;
    return;
  }

  const el = document.createElement("style");

  el.setAttribute("type", "text/css");
  el.setAttribute("id", "style-" + id);
  el.innerHTML = css;

  document.getElementsByTagName("head")[0].appendChild(el);
}

export default {
  renderStyle,
  renderSchema,
  appendStyle,
};
