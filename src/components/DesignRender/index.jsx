import React from "react";
import Logger from "lp-logger";
import classnames from "classnames";
import { observer } from "mobx-react";
import utils from "./utils";

import "./index.less";

const logger = new Logger({
  name: "le-DesignRender",
  level: "error",
});
class DesignRender extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    logger.log("render");
    const {
      dsl,
      component,
      style = {},
      className,
      getComponentInstance,
    } = this.props;

    // todo: clear unuse style
    utils.renderStyle(dsl).map((item) => utils.appendStyle(item));

    return (
      <div className={classnames("design-render", className)} style={style}>
        {utils.renderSchema(dsl, component, this, {
          ref: getComponentInstance,
        })}
      </div>
    );
  }
}

export default observer(DesignRender);
export { utils };
