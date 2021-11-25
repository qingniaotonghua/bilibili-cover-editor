import React from "react";
import { observer } from "mobx-react";
import Logger from "lp-logger";
import Tree from "./compoents/Tree";

import "./index.less";

const logger = new Logger({
  name: "le-PanelOutline",
  level: "error",
});

export default observer(
  class extends React.Component {
    render() {
      const { ctx } = this.props;
      const dslManager = ctx.get("dsl");
      const canvas = ctx.get("canvas");

      logger.log("render");

      return (
        <div className="panel-outline">
          <Tree
            onHover={(item) => {
              canvas.hoverNodeById(item.id);
            }}
            onClick={(item) => {
              canvas.selectNodeById(item.id);
            }}
            onChange={(data) => {
              console.log("onchange");
              const pageDsl = data.map((item, index, arr) => {
                const { title, props, ...other } = item;

                return {
                  ...other,
                  props: {
                    ...props,
                    css: setZIndex(props.css, arr.length - index - 1),
                  },
                };
              });

              dslManager.setDSL({ page: pageDsl });
            }}
            data={dslManager.dsl.page
              .slice()
              .sort((a, b) => -getZIndex(a.props.css) + getZIndex(b.props.css))
              .map((item) => ({
                ...item,
                title: item.componentName,
              }))}
          />
        </div>
      );
    }
  }
);

function setZIndex(str, value) {
  return str.replace(/z-index:\s*(-?\d+?)/, `z-index:${value}`);
}

function getZIndex(str) {
  return str.match(/z-index:\s*(-?\d+?)/)?.[1];
}
