import React from "react";
import Logger from "lp-logger";
import classnames from "classnames";
import { observer } from "mobx-react";
import utils from "./utils";

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
    const { dsl, component, style = {}, className } = this.props;
    let parseDSL;
    // todo: clear unuse style
    utils.renderStyle(dsl).map((item) => utils.appendStyle(item));

    try {
      parseDSL = dsl;
    } catch (error) {
      logger.error("dsl parse err", error);
    }

    return (
      <div className={classnames("design-render", className)} style={style}>
        {utils.renderSchema(parseDSL, component, this)}
      </div>
    );
  }
}

export default observer(DesignRender);
export { utils };
