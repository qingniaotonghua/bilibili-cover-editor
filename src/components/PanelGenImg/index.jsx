import React from "react";
import html2canvas from "html2canvas";
import { Button, Modal, message } from "antd";

import "antd/lib/button/style/index.css";
import "antd/lib/modal/style/index.css";
import "antd/lib/message/style/index.css";

class PanelGenImg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleOpenDialog() {
    const hideMsg = message.loading("生成中……");
    html2canvas(document.getElementById("panel-canvas-absolute"), {
      allowTaint: true,
      useCORS: true,
      scale: 1,
    }).then((canvas) => {
      hideMsg();
      this.setState(
        {
          visible: true,
        },
        () => {
          this.refPreview.src = canvas.toDataURL();

          this.refDownloadA.href = this.refPreview.src;
          this.refDownloadA.download = Date.now() + ".png";
        }
      );
    });
  }

  handleCloseDialog() {
    this.setState({
      visible: false,
    });
  }

  handleDownload() {
    this.refDownloadA.click();
  }

  render() {
    const { ctx } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.handleOpenDialog}>
          生成图片
        </Button>

        <Modal
          title="生成图片"
          visible={visible}
          onCancel={this.handleCloseDialog}
          maskClosable={false}
          footer={[
            <Button type="primary" onClick={this.handleDownload}>
              下载图片
            </Button>,
          ]}
        >
          <a ref={(_) => (this.refDownloadA = _)}></a>
          <img style={{ width: "100%" }} ref={(_) => (this.refPreview = _)} />
        </Modal>
      </div>
    );
  }
}

export default PanelGenImg;
