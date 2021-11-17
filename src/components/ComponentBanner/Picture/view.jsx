import React from "react";
import classnames from "classnames";

import "./view.less";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, url, width } = this.props;
    return (
      <img
        className={classnames(className, "banner-picture")}
        src={url}
      />
    );
  }
}
