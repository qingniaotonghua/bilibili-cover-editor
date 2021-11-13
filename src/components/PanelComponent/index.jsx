import React from "react";
import { Collapse, Row, Col } from "antd";
import Logger from "lp-logger";

import "antd/dist/antd.min.css";
import "./index.less";

const logger = new Logger({
  name: "le-PanelComponent",
  level: "error",
});

function sortByGroup(data) {
  const result = {};

  data.forEach((item, key) => {
    if (!result[item.category]) {
      result[item.category] = [];
    }

    item.hidden != true && result[item.category].push(item);
  });

  return Object.entries(result)
    .filter((item) => item[1].length)
    .map((item, index) => ({
      key: item[0],
      id: index,
      value: item[1],
    }));
}

class PanelComponent extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.refGhost = null;

    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDrag = this.handleOnDrag.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
  }

  handleOnDragStart({ target, dataTransfer }) {
    if (target.dataset["type"] != "component") {
      return;
    }

    if (!this.refGhost) {
      return;
    }

    dataTransfer.effectAllowed = "move";

    this.refGhost.innerText = target.dataset["title"];
    dataTransfer.setDragImage(this.refGhost, 0, this.refGhost.clientHeight / 2);
    dataTransfer.setData("componentName", target.dataset["componentName"]);
  }

  handleOnDrag({ target }) {
    target.style.cursor = "unset";
    window.document.getElementsByTagName("html")[0].style.cursor = "move";
  }

  handleOnDragEnd({ target }) {
    window.document.getElementsByTagName("html")[0].style.cursor = "default";
    target.style.cursor = "grab";
  }

  render() {
    const { ctx } = this.props;
    const sortComponentList = sortByGroup(ctx.get("component"));

    return (
      <div
        className="panel-component"
        onDragStart={this.handleOnDragStart}
        onDragEnd={this.handleOnDragEnd}
        onDrag={this.handleOnDrag}
      >
        <div className="panel-component-ghost-hidden">
          <div
            className="panel-component-ghost"
            ref={(_) => (this.refGhost = _)}
          ></div>
        </div>
        <Collapse
          defaultActiveKey={sortComponentList.map((item) => item.id)}
          bordered={false}
          onChange={(f) => f}
        >
          {sortComponentList.map((group) => (
            <Collapse.Panel header={group.key} key={group.id}>
              <Row>
                {group.value.map((component, key) => (
                  <Col span={6} key={key}>
                    <div
                      className="panel-component-item"
                      draggable
                      title={component.title}
                      data-type="component"
                      data-title={component.title}
                      data-component-name={component.componentName}
                    >
                      {/* <img
                        draggable="false"
                        className="panel-component-item-img"
                        src={component.icon}
                      /> */}
                      {component.icon}
                      <div className="panel-component-item-title">
                        {component.title}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

export default PanelComponent;
