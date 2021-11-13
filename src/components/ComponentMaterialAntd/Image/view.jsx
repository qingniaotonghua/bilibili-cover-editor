import React from "react";
import classnames from "classnames";
import { Image as _Image } from "antd";

export default class Image extends React.Component {
  render() {
    const { src, width, __id } = this.props;
    const _style = {};

    width && (_style.width = width);
    //  todo classname
    return (
      <div className={classnames(__id)} style={_style}>
        <_Image src={src} />
      </div>
    );
  }
}
