import React from "react";
import { observer } from "mobx-react";
import { debounce } from "lodash";
import Logger from "lp-logger";
import Tree from "./compoents/Tree";

import "./index.less";

const logger = new Logger({
  name: "le-PanelOutline",
  level: "error",
});

export default observer(
  class extends React.Component {
    constructor(props) {
      super(props);

      // 防止 setDSL 后，ref 没有挂载完成
      this.onHover = debounce(this.onHover.bind(this), 300);
    }

    onHover(item) {
      const { ctx } = this.props;
      const canvas = ctx.get("canvas");

      canvas.hoverNodeById(item.id);
    }

    render() {
      const { ctx } = this.props;
      const dslManager = ctx.get("dsl");
      const canvas = ctx.get("canvas");

      logger.log("render");

      return (
        <div className="panel-outline">
          <Tree
            onHover={this.onHover}
            onClick={(item) => {
              canvas.selectNodeById(item.id);
            }}
            onChange={(data) => {
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
  return Number(str.match(/z-index:\s*(-?\d+?)/)?.[1]);
}
