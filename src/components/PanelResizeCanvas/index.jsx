import React from "react";
import { Button, InputNumber } from "antd";

import "antd/lib/button/style/index.css";
import "antd/lib/input-number/style/index.css";

class PanelResizeCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 16 : 9
      // x: 720,
      // y: 405,
      // bilibili size
      x: 686,
      y: 390,
    };
  }

  componentDidMount() {
    const { ctx } = this.props;
    const { x, y } = this.state;
    setTimeout(() => {
      const canvasDOM = document.getElementById(
        ctx.get("skeleton.canvas").containerId
      );

      canvasDOM.style.width = x + "px";
      canvasDOM.style.height = y + "px";
    });
  }

  handleOnChange(name, value) {
    const { ctx } = this.props;
    const canvasDOM = document.getElementById(
      ctx.get("skeleton.canvas").containerId
    );
    this.setState({ [name]: value }, () => {
      const { x, y } = this.state;
      canvasDOM.style.width = x + "px";
      canvasDOM.style.height = y + "px";
    });
  }

  render() {
    const { x, y } = this.state;
    //
    return (
      <div>
        <InputNumber
          size="small"
          value={x}
          onChange={(value) => this.handleOnChange("x", value)}
        />
        &nbsp;x&nbsp;
        <InputNumber
          size="small"
          value={y}
          onChange={(value) => this.handleOnChange("y", value)}
        />
      </div>
    );
  }
}

export default PanelResizeCanvas;
