import React from "react";
import Logger from "lp-logger";
import classnames from "classnames";
import utils from "./utils";

const logger = new Logger({
  name: "le-DesignRender",
  level: "error",
});

export default class DesignRender extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // todo: 样式无效
    const { dsl } = this.props;

    utils.renderStyle(dsl).map((item) => utils.appendStyle(item));
  }

  render() {
    const { dsl, component, style = {}, className } = this.props;
    let parseDSL;

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

export { utils };
