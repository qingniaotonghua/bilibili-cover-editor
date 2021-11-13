import React from "react";

import "./view.less";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return <div className="le-page">{children}</div>;
  }
}
