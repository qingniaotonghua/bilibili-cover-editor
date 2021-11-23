import React from "react";
import { observer } from "mobx-react";
import Tree from "./compoents/Tree";

import "./index.less";

export default observer(
  class extends React.Component {
    render() {
      const { ctx } = this.props;
      const dslManager = ctx.get("dsl");
      const canvas = ctx.get("canvas");

      return (
        <div className="panel-outline">
          <Tree
            onHover={(item) => {
              canvas.hoverNodeById(item.id);
            }}
            onClick={(item) => {
              canvas.selectNodeById(item.id);
            }}
            onChange={(data) => {}}
            data={dslManager.dsl.page.map((item) => ({
              ...item,
              title: item.componentName,
            }))}
          />
        </div>
      );
    }
  }
);
