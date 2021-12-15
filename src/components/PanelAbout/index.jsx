import React from "react";
import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import "antd/lib/button/style/index.css";

class PanelAbout extends React.Component {
  render() {
    return (
      <div>
        <Button
          type="text"
          icon={<GithubOutlined size="large" />}
          onClick={() => {
            window.open("http://github.com/lecepin");
          }}
        >
          源码
        </Button>
      </div>
    );
  }
}

export default PanelAbout;
