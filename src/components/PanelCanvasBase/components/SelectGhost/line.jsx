import React from "react";
import classnames from "classnames";

import "./line.less";

export default class extends React.Component {
  static defaultProps = {
    type: "hor", // ver
    color: "#f759ab",
  };

  constructor(props) {
    super(props);
    this.state = {
      size: "0",
      x: "0",
      y: "0",
    };
  }

  setPos({ size, x, y }) {
    this.setState({
      size,
      x,
      y,
    });
  }

  render() {
    const { type, color } = this.props;
    const { size, x, y } = this.state;
    const sizeStyle = {
      left: x,
      top: y,
      borderColor: color,
    };

    if (type == "hor") {
      sizeStyle.width = size;
    } else {
      sizeStyle.height = size;
    }

    return (
      <div
        className={classnames("reference-line", "reference-line-" + type)}
        style={sizeStyle}
      ></div>
    );
  }
}
