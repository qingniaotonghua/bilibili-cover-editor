import React from "react";
import { Button as _Button } from "antd";

export default class Button extends React.Component {
  render() {
    const { content, __componentName, ...otherProps } = this.props;

    return <_Button {...otherProps}>{content}</_Button>;
  }
}
