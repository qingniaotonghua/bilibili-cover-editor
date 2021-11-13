import React from "react";

import "./index.less";

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

    return (
      <div className="panel-attribute">
        <div className="panel-attribute-name">{componentInfo.title}</div>
        <div>{JSON.stringify(dslInfo, null, 2)}</div>
      </div>
    );
  }
}

export default PanelAttribute;
