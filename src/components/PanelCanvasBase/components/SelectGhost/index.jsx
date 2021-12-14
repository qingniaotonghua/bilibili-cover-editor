import React from "react";
import ReactDOM, { createPortal } from "react-dom";
import { throttle } from "lodash";
import Logger from "lp-logger";
import Line from "./line";

import SvgDel from "./images/del.svg";
import SvgCopy from "./images/copy.svg";
import SvgDrag from "./images/drag.svg";
import SvgTop from "./images/top.svg";
import SvgBottom from "./images/bottom.svg";

import "./index.less";

const logger = new Logger({
  name: "le-SelectGhost",
  level: "error",
});

export default class SelectGhost extends React.PureComponent {
  static defaultProps = {
    canResize: false,
  };

  constructor(props) {
    super(props);

    this._node = this.startDrag = this.startMoveDir = null;
    this.refMask =
      this.ref =
      this.refTopHorLine =
      this.refLeftVerLine =
      this.refRightVerLine =
        null;
    this.startPos = {};
    this.attractDelta = 10;

    this.handleClickResize = this.handleClickResize.bind(this);
    this.handleWindowResize = throttle(this.handleClickResize.bind(this), 300);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleToBottom = this.handleToBottom.bind(this);
    this.handleToTop = this.handleToTop.bind(this);

    this.portalDom = document.createElement("div");
    document.body.appendChild(this.portalDom);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickResize);
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("keyup", this.handleWindowResize);

    window.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickResize);
    window.removeEventListener("resize", this.handleWindowResize);
    window.addEventListener("keyup", this.handleWindowResize);
    window.removeEventListener("mouseup", this.handleMouseUp);

    document.body.removeChild(this.portalDom);
  }

  getEl() {
    return ReactDOM.findDOMNode(this.ref);
  }

  setStyle(styles) {
    const el = this.getEl();

    el &&
      Object.entries(styles).map((item) => {
        el.style[item[0]] = item[1];
      });
  }

  setName(text) {
    const el = ReactDOM.findDOMNode(this.refName);

    el.textContent = text;
  }

  _setNodeStyle() {
    const el = this._node?.el;
    const { canvasDomId } = this.props;

    if (!el) {
      this.setStyle({
        display: "none",
      });

      return;
    }

    const canvasDom = document.getElementById(canvasDomId);
    const canvasPosition = canvasDom.getBoundingClientRect();
    const {
      left: boundLeft,
      top: boundTop,
      right: boundRight,
      bottom: boundBottom,
      width: boundWidth,
      height: boundHeight,
    } = el.getBoundingClientRect();
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    // const centerPointer = {
    //   x: boundLeft + boundWidth / 2,
    //   y: boundTop + boundHeight / 2,
    // };

    // 要获取未旋转时的 left/top ?
    // const left = centerPointer.x - width / 2;
    // const top = centerPointer.y - height / 2;

    // todo： 滚动的处理
    this.setStyle({
      left: boundLeft + "px",
      top: boundTop + "px",
      width: width + "px",
      height: height + "px",
      display: "block",
      // transform: ,
    });

    // op操作区位置重置
    const opHeight = 30;
    const opStyle = {
      left: "unset",
      top: "unset",
      right: "unset",
      bottom: "unset",
    };

    if (boundTop < opHeight) {
      opStyle.bottom = -1 * opHeight + "px";
    } else if (boundBottom < opHeight) {
      opStyle.top = -1 * opHeight + "px";
    } else {
      opStyle.top = -1 * opHeight + "px";
    }
    if (boundLeft < 0) {
      opStyle.right = 0;
    } else if (boundRight > window.innerWidth) {
      opStyle.left = 0;
    } else {
      opStyle.right = 0;
    }

    Object.entries(opStyle).map(
      ([name, value]) => (this.refOp.style[name] = value)
    );
  }

  // todo: 优化只有resize canvas才触发
  // 解决canvas变化，select没有同步大小
  handleClickResize() {
    this._setNodeStyle();
  }

  setNode(nodeInfo) {
    const { ctx } = this.props;

    ctx?.get("event")?.emit("le.node.select", nodeInfo);
    this._node = nodeInfo;
    this._setNodeStyle();
  }

  handleMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();

    const { onDragStart } = this.props;
    const el = this._node?.el;

    this.startPos = {
      // 开始位置需要取真正边上的位置，改用 clientX，来实现配合 getBoundingClientRect 计算真实位置
      mouseX: e.target.getBoundingClientRect().x + e.target.offsetWidth / 2,
      mouseY: e.target.getBoundingClientRect().y + +e.target.offsetHeight / 2,
      // ? margin
      width: this.ref.clientWidth,
      height: this.ref.clientHeight,
      top: parseInt(this.ref.offsetTop) || 0,
      left: parseInt(this.ref.offsetLeft) || 0,
      selectTop: parseInt(el.offsetTop) || 0,
      selectLeft: parseInt(el.offsetLeft) || 0,
      dir: e.target.dataset.dir,
      selectStyle: el.style,
    };

    window.addEventListener("mousemove", this.handleMouseMove);

    // 按下拖拽
    if (e.target.classList.contains("panel-canvas-base-select-ghost-drag")) {
      onDragStart?.();
      this.startDrag = true;
      // 防止动画干扰拖动
      el.style.transition = "none";
      return;
    }

    // 大小调整
    if (e.target.classList.contains("panel-canvas-base-select-ghost-block")) {
      this.startMoveDir = true;
      // 防止动画干扰拖动
      el.style.transition = "none";
      return;
    }
  }

  handleMouseMove(e) {
    const { onDrag, canvasDomId } = this.props;
    const el = this._node?.el;
    const canvasDom = document.getElementById(canvasDomId);
    const canvasPosition = canvasDom.getBoundingClientRect();
    const elStyle = {};
    let diffPos = {
      left: e.clientX - this.startPos.mouseX,
      top: e.clientY - this.startPos.mouseY,
    };

    // 拖动
    if (this.startDrag) {
      this.refMask.style.display = "block";
      this.ref.style.zIndex = 99999;

      let dealTop = this.startPos.top + diffPos.top;
      let dealLeft = this.startPos.left + diffPos.left;

      // 吸附判断 顶部
      if (
        dealTop >= -1 * this.attractDelta + canvasPosition.top &&
        dealTop <= this.attractDelta + canvasPosition.top
      ) {
        this.ref.style.top = canvasPosition.top + "px";
        elStyle.top = 0;
        this.refTopHorLine.setPos({
          size: canvasPosition.width + "px",
          x: canvasPosition.left + "px",
          y: canvasPosition.top + "px",
        });
      }
      // 吸附判断 底部
      else if (
        dealTop + this.startPos.height >=
          -1 * this.attractDelta + canvasPosition.bottom &&
        dealTop + this.startPos.height <=
          this.attractDelta + canvasPosition.bottom
      ) {
        this.ref.style.top =
          canvasPosition.bottom - this.startPos.height + "px";
        elStyle.top = canvasPosition.height - this.startPos.height + "px";
        this.refBottomHorLine.setPos({
          size: canvasPosition.width + "px",
          x: canvasPosition.left + "px",
          y: canvasPosition.bottom + "px",
        });
      } else {
        this.ref.style.top = this.startPos.top + diffPos.top + "px";
        elStyle.top = this.startPos.selectTop + diffPos.top + "px";

        this.refTopHorLine.setPos({ size: 0 });
        this.refBottomHorLine.setPos({ size: 0 });
      }

      // 吸附判断 左侧
      if (
        dealLeft >= -1 * this.attractDelta + canvasPosition.left &&
        dealLeft <= this.attractDelta + canvasPosition.left
      ) {
        this.ref.style.left = canvasPosition.left + "px";
        elStyle.left = 0;
        this.refLeftVerLine.setPos({
          size: canvasPosition.height + "px",
          x: canvasPosition.left + "px",
          y: canvasPosition.top + "px",
        });
      }
      // 吸附判断 右侧
      else if (
        dealLeft + this.startPos.width >=
          -1 * this.attractDelta + canvasPosition.right &&
        dealLeft + this.startPos.width <=
          this.attractDelta + canvasPosition.right
      ) {
        this.ref.style.left = canvasPosition.right - this.startPos.width + "px";
        elStyle.left = canvasPosition.width - this.startPos.width + "px";
        this.refRightVerLine.setPos({
          size: canvasPosition.height + "px",
          x: canvasPosition.right + "px",
          y: canvasPosition.top + "px",
        });
      } else {
        this.ref.style.left = this.startPos.left + diffPos.left + "px";
        elStyle.left = this.startPos.selectLeft + diffPos.left + "px";

        this.refLeftVerLine.setPos({ size: 0 });
        this.refRightVerLine.setPos({ size: 0 });
      }

      el.style.left = elStyle.left;
      el.style.top = elStyle.top;

      onDrag?.(elStyle);
      return;
    }

    // 大小调整
    if (this.startMoveDir) {
      // 方向判断
      if (this.startPos.dir[0] == "t") {
        // 往上
        {
          // 吸顶判断 顶部
          let dealTop = this.startPos.top + diffPos.top;
          if (
            dealTop >= -1 * this.attractDelta + canvasPosition.top &&
            dealTop <= this.attractDelta + canvasPosition.top
          ) {
            this.ref.style.top = canvasPosition.top + "px";
            this.ref.style.height =
              this.startPos.height -
              (canvasPosition.top - this.startPos.mouseY) +
              "px";
            elStyle.top = 0 + "px";
            elStyle.height =
              this.startPos.height -
              (canvasPosition.top - this.startPos.mouseY) +
              "px";

            this.refTopHorLine.setPos({
              size: canvasPosition.width + "px",
              x: canvasPosition.left + "px",
              y: canvasPosition.top + "px",
            });
          } else {
            this.ref.style.top = this.startPos.top + diffPos.top + "px";
            this.ref.style.height = this.startPos.height - diffPos.top + "px";
            elStyle.top = this.startPos.selectTop + diffPos.top + "px";
            elStyle.height = this.startPos.height - diffPos.top + "px";

            this.refTopHorLine.setPos({ size: 0 });
          }
        }
      } else if (this.startPos.dir[0] == "b") {
        // 往下
        {
          // 吸顶判断 顶部
          let dealTop = this.startPos.top + diffPos.top;
          if (
            dealTop + this.startPos.height >=
              -1 * this.attractDelta + canvasPosition.bottom &&
            dealTop + this.startPos.height <=
              this.attractDelta + canvasPosition.bottom
          ) {
            this.ref.style.height =
              this.startPos.height +
              (canvasPosition.bottom - this.startPos.mouseY) +
              "px";
            elStyle.height =
              this.startPos.height +
              (canvasPosition.bottom - this.startPos.mouseY) +
              "px";

            this.refBottomHorLine.setPos({
              size: canvasPosition.width + "px",
              x: canvasPosition.left + "px",
              y: canvasPosition.bottom + "px",
            });
          } else {
            this.ref.style.height = this.startPos.height + diffPos.top + "px";
            elStyle.height = this.startPos.height + diffPos.top + "px";

            this.refBottomHorLine.setPos({ size: 0 });
          }
        }
      }
      if (this.startPos.dir[1] == "l") {
        // 往左
        {
          let dealLeft = this.startPos.left + diffPos.left;

          // 吸顶判断 左部
          if (
            dealLeft >= -1 * this.attractDelta + canvasPosition.left &&
            dealLeft <= this.attractDelta + canvasPosition.left
          ) {
            this.ref.style.left = canvasPosition.left + "px";
            this.ref.style.width =
              this.startPos.width -
              (canvasPosition.left - this.startPos.mouseX) +
              "px";
            elStyle.left = 0;
            elStyle.width =
              this.startPos.width -
              (canvasPosition.left - this.startPos.mouseX) +
              "px";

            this.refLeftVerLine.setPos({
              size: canvasPosition.height + "px",
              x: canvasPosition.left + "px",
              y: canvasPosition.top + "px",
            });
          } else {
            this.ref.style.left = this.startPos.left + diffPos.left + "px";
            this.ref.style.width = this.startPos.width - diffPos.left + "px";
            elStyle.left = this.startPos.selectLeft + diffPos.left + "px";
            elStyle.width = this.startPos.width - diffPos.left + "px";

            this.refLeftVerLine.setPos({
              size: 0,
            });
          }
        }
      } else if (this.startPos.dir[1] == "r") {
        // 往右
        {
          let dealLeft = this.startPos.left + diffPos.left;

          // 吸顶判断 右部
          if (
            dealLeft + this.startPos.width >=
              -1 * this.attractDelta + canvasPosition.right &&
            dealLeft + this.startPos.width <=
              this.attractDelta + canvasPosition.right
          ) {
            this.ref.style.width =
              this.startPos.width +
              (canvasPosition.right - this.startPos.mouseX) +
              "px";
            elStyle.width =
              this.startPos.width +
              (canvasPosition.right - this.startPos.mouseX) +
              "px";

            this.refRightVerLine.setPos({
              size: canvasPosition.height + "px",
              x: canvasPosition.right + "px",
              y: canvasPosition.top + "px",
            });
          } else {
            this.ref.style.width = this.startPos.width + diffPos.left + "px";
            elStyle.width = this.startPos.width + diffPos.left + "px";

            this.refRightVerLine.setPos({ size: 0 });
          }
        }
      }

      Object.entries(elStyle).filter(([key, value]) => (el.style[key] = value));
    }
  }

  handleMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();

    window.removeEventListener("mousemove", this.handleMouseMove);

    const { onDragEnd } = this.props;

    // click的执行顺序问题
    (this.startDrag || this.startMoveDir) &&
      setTimeout(() => {
        const cssObj = {
          left: (this._node?.el?.offsetLeft || 0) + "px",
          top: (this._node?.el?.offsetTop || 0) + "px",
        };

        this._node?.el?.style?.width &&
          (cssObj.width = this._node?.el?.style?.width);
        this._node?.el?.style?.height &&
          (cssObj.height = this._node?.el?.style?.height);

        // reset el style
        this._node.el.style = this.startPos.selectStyle;
        onDragEnd?.(cssObj, this._node);
      });

    // 重置标志位
    this.startDrag = this.startMoveDir = false;
    this.refMask.style.display = "none";
    this.ref.style.zIndex = 800;
    this.refTopHorLine.setPos({ size: 0 });
    this.refBottomHorLine.setPos({ size: 0 });
    this.refLeftVerLine.setPos({ size: 0 });
    this.refRightVerLine.setPos({ size: 0 });
  }

  handleDel() {
    const { ctx, onDel } = this.props;

    ctx?.get("event")?.emit("le.node.select");
    onDel?.(this._node);
    this.setNode(null);
  }

  handleToTop() {
    const { ctx, onToTop } = this.props;
    const dslManager = ctx.get("dsl");
    const { componentInstance } = ctx.get("canvas");
    const currentId = this._node.dslInfo.id;
    const currentCss = this._node.dslInfo.props.css;
    const zIndexsComponent = {};
    let replaceId = null;
    let replaceCss = "";

    dslManager.dsl.page.map(({ id, props }, index, arr) => {
      const ref = componentInstance.get(id);
      const el = ReactDOM.findDOMNode(ref);
      const zIndex = getComputedStyle(el).getPropertyValue("z-index");

      if (zIndex == arr.length - 1) {
        replaceId = id;
        replaceCss = props.css;
      }

      zIndexsComponent[id] = zIndex;
    });

    if (!(zIndexsComponent[currentId] == dslManager.dsl.page.length - 1)) {
      onToTop?.({
        currentId,
        currentCss,
        replaceId,
        replaceCss,
        value: dslManager.dsl.page.length - 1,
        swapValue: getComputedStyle(this._node.el).getPropertyValue("z-index"),
      });
    }
  }

  handleToBottom() {
    const { ctx, onToBottom } = this.props;
    const dslManager = ctx.get("dsl");
    const { componentInstance } = ctx.get("canvas");
    const currentId = this._node.dslInfo.id;
    const currentCss = this._node.dslInfo.props.css;
    const zIndexsComponent = {};
    let replaceId = null;
    let replaceCss = "";

    dslManager.dsl.page.map(({ id, props }, index, arr) => {
      const ref = componentInstance.get(id);
      const el = ReactDOM.findDOMNode(ref);
      const zIndex = getComputedStyle(el).getPropertyValue("z-index");

      if (zIndex == 0) {
        replaceId = id;
        replaceCss = props.css;
      }

      zIndexsComponent[id] = zIndex;
    });

    if (!(zIndexsComponent[currentId] == 0)) {
      onToBottom?.({
        currentId,
        currentCss,
        replaceId,
        replaceCss,
        value: 0,
        swapValue: getComputedStyle(this._node.el).getPropertyValue("z-index"),
      });
    }
  }

  render() {
    const { ctx, canResize, onDrag, onDragStart, onDragEnd, onDel } =
      this.props;

    return createPortal(
      <>
        <div
          ref={(_) => (this.ref = _)}
          className="panel-canvas-base-select-ghost"
          onMouseDown={this.handleMouseDown}
        >
          {canResize ? (
            <>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-tl"
                data-dir="tl"
              ></div>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-tm"
                data-dir="tm"
              ></div>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-tr"
                data-dir="tr"
              ></div>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-ml"
                data-dir="ml"
              ></div>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-mr"
                data-dir="mr"
              ></div>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-bl"
                data-dir="bl"
              ></div>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-bm"
                data-dir="bm"
              ></div>
              <div
                className="panel-canvas-base-select-ghost-block panel-canvas-base-select-ghost-br"
                data-dir="br"
              ></div>
            </>
          ) : null}

          <div className="panel-canvas-base-select-ghost-rotate"></div>
          {/* todo: 边界判断 位置放置 */}
          <div
            className="panel-canvas-base-select-ghost-op"
            ref={(_) => (this.refOp = _)}
          >
            <div className="panel-canvas-base-select-ghost-drag" title="拖动">
              <img src={SvgDrag} />
            </div>
            {/* <div className="panel-canvas-base-select-ghost-copy" title="复制">
              <img src={SvgCopy} />
            </div> */}
            <div
              className="panel-canvas-base-select-ghost-top"
              title="置顶"
              onClick={this.handleToTop}
            >
              <img src={SvgTop} />
            </div>
            <div
              className="panel-canvas-base-select-ghost-bottom"
              title="置底"
              onClick={this.handleToBottom}
            >
              <img src={SvgBottom} />
            </div>
            <div
              className="panel-canvas-base-select-ghost-del"
              title="删除"
              onClick={this.handleDel}
            >
              <img src={SvgDel} />
            </div>
          </div>
        </div>
        <div
          ref={(_) => (this.refMask = _)}
          className="panel-canvas-base-select-ghost-mask"
        ></div>
        <Line ref={(_) => (this.refTopHorLine = _)} />
        <Line ref={(_) => (this.refBottomHorLine = _)} />
        <Line type="ver" ref={(_) => (this.refLeftVerLine = _)} />
        <Line type="ver" ref={(_) => (this.refRightVerLine = _)} />
      </>,
      this.portalDom
    );
  }
}
