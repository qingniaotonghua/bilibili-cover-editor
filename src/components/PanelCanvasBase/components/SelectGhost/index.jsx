import React from "react";
import ReactDOM from "react-dom";
import { throttle } from "lodash";

import SvgDel from "./images/del.svg";
import SvgCopy from "./images/copy.svg";
import SvgDrag from "./images/drag.svg";

import "./index.less";

export default class SelectGhost extends React.PureComponent {
  static defaultProps = {
    canResize: false,
  };

  constructor(props) {
    super(props);

    this._node = this.startDrag = null;
    this.startPos = {};

    this.handleClickResize = this.handleClickResize.bind(this);
    this.handleWindowResize = throttle(this.handleClickResize.bind(this), 300);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickResize);
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickResize);
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  getEl() {
    return ReactDOM.findDOMNode(this.ref);
  }

  setStyle(styles) {
    const el = this.getEl();

    Object.entries(styles).map((item) => {
      el.style[item[0]] = item[1];
    });
  }

  setName(text) {
    const el = ReactDOM.findDOMNode(this.refName);

    el.textContent = text;
  }

  _setNodeStyle() {
    if (!this._node) {
      this.setStyle({
        display: "none",
      });

      return;
    }

    const {
      left: boundLeft,
      top: boundTop,
      width: boundWidth,
      height: boundHeight,
    } = this._node.getBoundingClientRect();
    const width = this._node.offsetWidth;
    const height = this._node.offsetHeight;
    // const centerPointer = {
    //   x: boundLeft + boundWidth / 2,
    //   y: boundTop + boundHeight / 2,
    // };

    // 要获取未旋转时的 left/top ?
    // const left = centerPointer.x - width / 2;
    // const top = centerPointer.y - height / 2;

    this.setStyle({
      left: boundLeft + "px",
      top: boundTop + "px",
      width: width + "px",
      height: height + "px",
      display: "block",
      // transform: ,
    });
    // this.setName(componentInfo.title);
  }

  // todo: 优化只有resize canvas才触发
  // 解决canvas变化，select没有同步大小
  handleClickResize() {
    this._setNodeStyle();
  }

  setNode(el, nodeInfo) {
    const { ctx } = this.props;

    el && ctx?.get("event")?.emit("le.node.select", nodeInfo);
    this._node = el;
    this._setNodeStyle();
  }

  handleMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();

    const { onDragStart } = this.props;

    this.startPos = {
      mouseX: e.pageX,
      mouseY: e.pageY,
      width: e.target.parentElement.parentElement.clientWidth,
      height: e.target.parentElement.parentElement.clientHeight,
      top: parseInt(e.target.parentElement.parentElement.offsetTop) || 0,
      left: parseInt(e.target.parentElement.parentElement.offsetLeft) || 0,
      selectTop: parseInt(this._node.offsetTop) || 0,
      selectLeft: parseInt(this._node.offsetLeft) || 0,
      dir: e.target.dataset.dir,
    };

    // 按下拖拽
    if (e.target.classList.contains("panel-canvas-base-select-ghost-drag")) {
      onDragStart?.();
      this.startDrag = true;
      // 防止动画干扰拖动
      this._node.style.transition = "none";
      return;
    }
  }

  handleMouseMove(e) {
    const { onDrag } = this.props;

    // 拖动
    if (this.startDrag) {
      this.refMask.style.display = "block";
      this.ref.style.zIndex = 99999;

      let diffPos = {
        left: e.pageX - this.startPos.mouseX,
        top: e.pageY - this.startPos.mouseY,
      };

      // todo 原始el无效果
      if (
        this.startPos.top + diffPos.top >
        0 // top > 0
      ) {
        this.ref.style.top = this.startPos.top + diffPos.top + "px";
        this._node.style.top = this.startPos.selectTop + diffPos.top + "px";
      }
      if (
        this.startPos.left + diffPos.left >
        0 // left > 0
      ) {
        this.ref.style.left = this.startPos.left + diffPos.left + "px";
        this._node.style.left = this.startPos.selectLeft + diffPos.left + "px";
      }

      onDrag?.();
      return;
    }
  }

  handleMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();

    const { onDragEnd } = this.props;

    // 重置标志位
    this.startDrag = false;
    this.refMask.style.display = "none";
    this.ref.style.zIndex = 2;

    // click的执行顺序问题
    setTimeout(() => {
      onDragEnd?.();
    });
  }

  render() {
    const { canResize, onDrag, onDragStart, onDragEnd } = this.props;

    return (
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
          <div className="panel-canvas-base-select-ghost-op">
            <div className="panel-canvas-base-select-ghost-drag" title="拖动">
              <img src={SvgDrag} />
            </div>
            <div className="panel-canvas-base-select-ghost-copy" title="复制">
              <img src={SvgCopy} />
            </div>
            <div className="panel-canvas-base-select-ghost-del" title="删除">
              <img src={SvgDel} />
            </div>
          </div>
        </div>
        <div
          ref={(_) => (this.refMask = _)}
          className="panel-canvas-base-select-ghost-mask"
        ></div>
      </>
    );
  }
}
