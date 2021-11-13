import React from "react";
import { Button } from "antd";
import "antd/lib/button/style/index.css";

class PanelSave extends React.Component {
  render() {
    const { ctx } = this.props;

    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            alert(JSON.stringify(ctx, null, 2));
          }}
        >
          保存
        </Button>
      </div>
    );
  }
}

export default PanelSave;
