import React from "react";
import Logger from "lp-logger";
import { observer } from "mobx-react";

import "./index.less";

const logger = new Logger({
  name: "le-PanelAttribute",
  level: "error",
});

class PanelAttribute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      componentInfo: {},
      dslInfo: {},
    };

    this.offEventNodeSelect = null;
    this.handleEventNodeSelect = this.handleEventNodeSelect.bind(this);
  }

  componentDidMount() {
    const { ctx } = this.props;

    this.offEventNodeSelect = ctx
      ?.get("event")
      ?.on?.("le.node.select", this.handleEventNodeSelect);
  }

  componentWillUnmount() {
    this.offEventNodeSelect?.();
  }

  handleEventNodeSelect(e) {
    this.setState({
      componentInfo: e.componentInfo,
      dslInfo: e.dslInfo,
    });
  }

  render() {
    const { componentInfo, dslInfo } = this.state;
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");

    logger.log("render");

    return (
      <div className="panel-attribute">
        <div className="panel-attribute-name">{componentInfo.title}</div>
        <div>
          {dslInfo?.id &&
            JSON.stringify(dslManager.getPageDSL(dslInfo.id), null, 2)}
        </div>
      </div>
    );
  }
}

export default observer(PanelAttribute);
