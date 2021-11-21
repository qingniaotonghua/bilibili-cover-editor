import React from "react";
import { Input } from "antd";

export default class extends React.Component {
  onChange(e) {
    const { setValue } = this.props;

    setValue(e.target.value);
  }

  render() {
    const { value, setValue, ...otherProps } = this.props;

    return (
      <Input value={value} onChange={(e) => this.onChange(e)} {...otherProps} />
    );
  }
}
