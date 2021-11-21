import React from "react";
import classnames from "classnames";

import "./view.less";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, type, className } = this.props;
    return (
      <div
        className={classnames(className, "banner-title", "banner-title-" + type)}
      >
        {title}
      </div>
    );
  }
}
