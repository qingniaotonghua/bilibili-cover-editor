import React from "react";
import { findDOMNode } from "react-dom";
import { observer } from "mobx-react";
import DesignRender from "./../DesignRender";
import Logger from "lp-logger";
import css from "css";
import { debounce, throttle } from "lodash";
import { utils, HoverGhost, SelectGhost } from "./../PanelCanvasBase";

import "./index.less";

const logger = new Logger({
  name: "le-PanelCanvasAbsolute",
  level: "error",
});

class PanelCanvasAbsolute extends React.Component {
  constructor(props) {
    super(props);

    this.containerId = "panel-canvas-absolute";
    this.componentInstance = new Map();
    this.currentHover =
      this.currentSelect =
      this.currentDragHover =
      this.refCanvas =
      this.refHoverGhost =
      this.refSelectGhost =
      this.refDesignRender =
      this.draging =
        null;
    this.handleOnMouseOver = debounce(this.handleOnMouseOver.bind(this), 50);
    this.handleOnClickCapture = this.handleOnClickCapture.bind(this);
    this.handleOnDragOver = throttle(this.handleOnDragOver.bind(this), 300);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSelectGhostOnDragStart =
      this.handleSelectGhostOnDragStart.bind(this);
    this.handleSelectGhostOnDrag = this.handleSelectGhostOnDrag.bind(this);
    this.handleSelectGhostOnDragEnd =
      this.handleSelectGhostOnDragEnd.bind(this);
    this.handleSelectGhostOnDel = this.handleSelectGhostOnDel.bind(this);
    this.handleGetComponentInstance =
      this.handleGetComponentInstance.bind(this);
    this.handleSelectGhostOnToZIndex =
      this.handleSelectGhostOnToZIndex.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
  }

  componentDidMount() {
    const { ctx } = this.props;

    ctx.set("canvas", {
      containerId: this.containerId,
      componentInstance: this.componentInstance,
      selectNodeById: this.selectNodeById.bind(this),
      hoverNodeById: this.hoverNodeById.bind(this),
    });
    window.document.addEventListener("mousemove", this.handleOnMouseOver);
    window.document.addEventListener("dragover", this.handleWinOnDragOver);
  }

  componentWillUnmount() {
    window.document.removeEventListener("mousemove", this.handleOnMouseOver);
    window.document.removeEventListener("dragover", this.handleWinOnDragOver);
  }

  handleWinOnDragOver(e) {
    e.preventDefault();
  }

  handleOnDragOver({ target }) {
    if (this.currentDragHover == target) {
      return;
    }

    this.currentDragHover = target;
    // console.log("handleOnDragOver", target);
  }

  handleOnDrop({ dataTransfer }) {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");
    const componentItem = ctx
      .get("component")
      .get(dataTransfer.getData("componentName"));

    if (!componentItem) {
      return;
    }

    const { id } = dslManager.addPageDSL(componentItem);
    setTimeout(() => {
      const { dslInfo } = this.selectNodeById(id);

      const cssObj = this._mergeCss(dslInfo.props.css, {
        "z-index": dslManager.dsl.page.length - 1,
      });
      dslManager.setPageDslProp(
        "css",
        `:root {${Object.keys(cssObj)
          .map((name) => `${name}:${cssObj[name]}`)
          .join(";")}}`,
        dslInfo.id
      );
    }, 300);
    // console.log("handleOnDrop", dataTransfer.getData("componentName"));
  }

  _mergeCss(cssText, style = {}) {
    const cssParse = css.parse(cssText, { silent: true });

    if (cssParse.stylesheet.parsingErrors.length) {
      logger.error("源码错误: " + cssParse.stylesheet.parsingErrors);
      return {};
    } else {
      const cssObj = {};

      cssParse.stylesheet.rules[0].declarations.map((item) => {
        cssObj[item.property] = item.value;
      });

      Object.entries(style).map(([key, value]) => {
        cssObj[key] = value;
      });

      return cssObj;
    }
  }

  handleOnMouseOver(e) {
    if (!this.refCanvas.contains(e.target)) {
      this.currentHover = null;
      return;
    }

    const { target } = e;
    const { ctx } = this.props;
    const fiberId = Object.keys(target).find((key) =>
      key.startsWith("__reactFiber$")
    );

    //todo: performance
    // 这个判断是有问题的，用该存储 node.el 进行判断，但会影响性能
    if (target == this.currentSelect) {
      this.refHoverGhost.setNode(null);
      this.currentHover = null;
      return;
    }

    if (this.currentHover == target) {
      return;
    }

    if (!fiberId || !this.refCanvas.contains(target)) {
      this.refHoverGhost.setNode(null);
      this.currentHover = null;
      return;
    }

    const node = utils.getComponentNodeByFiberNode(
      target[fiberId],
      ctx.get("component"),
      ctx.get("dsl").dsl.page
    );

    if (!node) {
      this.refHoverGhost.setNode(null);
      return;
    }

    this.refHoverGhost.setNode(node.el, node);
    this.currentHover = target;
  }

  handleOnClickCapture(e) {
    // 只处理画布渲染内的
    if (!findDOMNode(this.refDesignRender).contains(e.target)) {
      return;
    }

    e.stopPropagation();

    if (this.draging) {
      return;
    }

    const { target } = e;
    const { ctx } = this.props;
    const fiberId = Object.keys(target).find((key) =>
      key.startsWith("__reactFiber$")
    );

    if (this.currentSelect == target) {
      return;
    }

    if (!fiberId || !this.refCanvas.contains(target)) {
      this.refSelectGhost.setNode(null);
      return;
    }

    const node = utils.getComponentNodeByFiberNode(
      target[fiberId],
      ctx.get("component"),
      ctx.get("dsl").dsl.page
    );

    this.currentSelect = target;

    if (!node) {
      this.refSelectGhost.setNode(null);
      return;
    }

    this.refSelectGhost.setNode(node);
    this.refHoverGhost.setNode(null);
  }

  handleOnClick(e) {}

  handleSelectGhostOnDragStart() {
    this.draging = true;
  }
  handleSelectGhostOnDrag() {}
  handleSelectGhostOnDragEnd(style, { dslInfo }) {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");
    const cssObj = this._mergeCss(dslInfo.props.css, style);
    this.draging = false;

    dslManager.setPageDslProp(
      "css",
      `:root {${Object.keys(cssObj)
        .map((name) => `${name}:${cssObj[name]}`)
        .join(";")}}`,
      dslInfo.id
    );
  }
  handleSelectGhostOnDel({ dslInfo }) {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");

    dslManager.delPageDsl(dslInfo.id);
    this.currentSelect = this.currentHover = null;
  }

  handleGetComponentInstance(ref) {
    if (!ref?.props?.__id) {
      return;
    }
    // todo: 删除sync
    this.componentInstance.set(ref.props.__id, ref);
  }

  handleSelectGhostOnToZIndex({
    currentId,
    currentCss,
    replaceId,
    replaceCss,
    value,
    swapValue,
  }) {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");

    if (currentId == replaceId) {
      return;
    }

    dslManager.setPageDslProp(
      "css",
      `:root {${Object.entries(this._mergeCss(currentCss, { "z-index": value }))
        .map(([name, value]) => `${name}:${value}`)
        .join(";")}}`,
      currentId
    );

    replaceId &&
      dslManager.setPageDslProp(
        "css",
        `:root {${Object.entries(
          this._mergeCss(replaceCss, { "z-index": swapValue })
        )
          .map(([name, value]) => `${name}:${value}`)
          .join(";")}}`,
        replaceId
      );
  }

  selectNodeById(id) {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");
    const component = ctx.get("component");

    if (!this.componentInstance.get(id)) {
      this.currentSelect = null;
      return;
    }

    const node = {
      el: findDOMNode(this.componentInstance.get(id)),
      dslInfo: dslManager.getPageDSL(id),
    };
    node.componentInfo = component.get(node.dslInfo.componentName);
    this.refSelectGhost.setNode(node);
    this.currentSelect = node.el;
    return node;
  }

  hoverNodeById(id) {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");
    const component = ctx.get("component");
    let el;

    if (!this.componentInstance.get(id)) {
      this.refHoverGhost.setNode(null);
      this.currentHover = null;
      return;
    }

    // 当 dsl 修改后
    // react 重新渲染，导致 react 实例还没有挂载到 dom 上，导致报错
    try {
      el = findDOMNode(this.componentInstance.get(id));
    } catch (error) {
      return;
    }

    const node = {
      el,
      dslInfo: dslManager.getPageDSL(id),
    };
    node.componentInfo = component.get(node.dslInfo.componentName);
    this.refHoverGhost.setNode(node.el, node);
    this.currentHover = node.el;
    return node;
  }

  handleOnMouseLeave() {
    this.refHoverGhost.setNode(null);
  }

  render() {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");
    const component = ctx.get("component");

    logger.log("render");

    return (
      // 实现空边距截图效果，所以外面包了一层
      <div>
        <div
          className="panel-canvas-absolute"
          id={this.containerId}
          onClickCapture={this.handleOnClickCapture}
          onClick={this.handleOnClick}
          onDragOver={this.handleOnDragOver}
          onDrop={this.handleOnDrop}
          onMouseLeave={this.handleOnMouseLeave}
          ref={(_) => (this.refCanvas = _)}
        >
          {/* {!children ? <div className="panel-canvas-empty-block"></div> : null} */}
          <SelectGhost
            ref={(_) => (this.refSelectGhost = _)}
            canvasDomId={this.containerId}
            ctx={ctx}
            canResize
            onDragStart={this.handleSelectGhostOnDragStart}
            onDragEnd={this.handleSelectGhostOnDragEnd}
            onDel={this.handleSelectGhostOnDel}
            onToTop={this.handleSelectGhostOnToZIndex}
            onToBottom={this.handleSelectGhostOnToZIndex}
          />
          <HoverGhost ref={(_) => (this.refHoverGhost = _)} />

          {/* todo: 处理 给el自动加 absolute ，需要给 dsl 自动加这个属性
        如果有 transition 的el，是否要给它覆盖 还是怎样？
        */}
          <DesignRender
            ref={(_) => (this.refDesignRender = _)}
            className="panel-canvas-absolute-render"
            dsl={dslManager.dsl.page}
            component={component}
            style={{ height: "100%" }}
            getComponentInstance={this.handleGetComponentInstance}
          />
        </div>
      </div>
    );
  }
}

export default observer(PanelCanvasAbsolute);
