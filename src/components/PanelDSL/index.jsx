import React from "react";
import Logger from "lp-logger";
import { observer } from "mobx-react";
import MonacoEditor from "react-monaco-editor";

import "./index.less";

const logger = new Logger({
  name: "le-PanelDSL",
  level: "error",
});

class PanelDSL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");

    logger.log("render");

    return (
      <div className="panel-dsl">
        <MonacoEditor
          language="json"
          value={JSON.stringify(dslManager.dsl, null, 2)}
          // onChange={this.onChange}
        />
      </div>
    );
  }
}

export default observer(PanelDSL);
