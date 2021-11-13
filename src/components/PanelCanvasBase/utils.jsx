import Logger from "lp-logger";
import ReactDOM from "react-dom";

const logger = new Logger({
  name: "le-PanelCanvasBase-utils",
  level: "error",
});

function getComponentNodeByFiberNode(fiberNode, component, dsl) {
  const componentInfo =
    component.get(fiberNode?.memoizedProps?.__componentName) || null;

  if (!componentInfo && fiberNode.return) {
    return getComponentNodeByFiberNode(fiberNode.return, component, dsl);
  }

  try {
    return {
      componentInfo,
      el: ReactDOM.findDOMNode(fiberNode.stateNode),
      dslInfo: getDSLById(fiberNode.stateNode.props.__id, dsl),
    };
  } catch (error) {
    return null;
  }
}

function getDSLById(id, dsl) {
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

export { getComponentNodeByFiberNode };
