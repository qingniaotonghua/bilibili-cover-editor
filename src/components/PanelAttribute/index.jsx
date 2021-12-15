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
      componentInfo: null,
      dslInfo: null,
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
    logger.log("handleEventNodeSelect", e);
    this.setState({
      componentInfo: e?.componentInfo,
      dslInfo: e?.dslInfo,
    });
  }

  render() {
    const { componentInfo, dslInfo } = this.state;
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");

    logger.log("render");

    if (!componentInfo) {
      return (
        <div className="panel-attribute">
          <div className="panel-attribute-noselect">请在左侧画布选择</div>
        </div>
      );
    }

    return (
      <div className="panel-attribute">
        <div className="panel-attribute-name">{componentInfo?.title}</div>
        <div className="panel-attribute-content">
          {componentInfo?.props
            ?.filter((item) => item.display != "none")
            ?.map((item, index) => (
              <div key={index} className="panel-attribute-item">
                <div className="panel-attribute-item-title">{item.title}</div>
                <div className="panel-attribute-item-content">
                  {React.cloneElement(item.setter, {
                    value: dslInfo.props[item.name],
                    setValue: (value) =>
                      dslManager.setPageDslProp(item.name, value, dslInfo.id),
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default observer(PanelAttribute);
