import React from "react";
import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(e) {
    const { setValue } = this.props;

    setValue(e.target.value);
  }

  uploadOnChange(file) {
    const { setValue } = this.props;

    setValue(URL.createObjectURL(file));
    return false;
  }

  render() {
    const { value, setValue, ...otherProps } = this.props;

    return (
      <div style={{ display: "flex" }}>
        <Input value={value} onChange={(e) => this.onChange(e)} />
        <Upload
          showUploadList={false}
          beforeUpload={(file) => this.uploadOnChange(file)}
        >
          <Button icon={<UploadOutlined />}></Button>
        </Upload>
      </div>
    );
  }
}
