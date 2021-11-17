import React from "react";
import ReactDOM, { createPortal } from "react-dom";

import "./index.less";

export default class HoverGhost extends React.PureComponent {
  constructor(props) {
    super(props);

    this.portalDom = document.createElement("div");
    document.body.appendChild(this.portalDom);
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

  setNode(el, nodeInfo) {
    if (!el) {
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

    this.setStyle({
      left: boundLeft + "px",
      top: boundTop + "px",
      width: width + "px",
      height: height + "px",
      display: "block",
      // transform: ,
    });
    this.setName(nodeInfo.componentInfo.title);
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalDom);
  }

  render() {
    return createPortal(
      <div
        ref={(_) => (this.ref = _)}
        className="panel-canvas-base-hover-ghost"
      >
        <div
          ref={(_) => (this.refName = _)}
          className="panel-canvas-base-hover-ghost-name"
        ></div>
      </div>,
      this.portalDom
    );
  }
}
