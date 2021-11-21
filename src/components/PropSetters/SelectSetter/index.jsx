import React from "react";
import { Select } from "antd";

export default class extends React.Component {
  static defaultProps = {
    dataSource: [],
  };

  onChange(e) {
    const { setValue } = this.props;

    setValue(e);
  }

  render() {
    const { value, setValue, dataSource, ...otherProps } = this.props;

    return (
      <Select
        value={value}
        onChange={(e) => this.onChange(e)}
        style={{ width: "100%" }}
        {...otherProps}
      >
        {dataSource.map((item, key) => (
          <Select.Option value={item.value} key={key}>
            {item.title}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
