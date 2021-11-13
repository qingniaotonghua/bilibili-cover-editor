import React from "react";
import classnames from "classnames";
import { Tooltip } from "antd";

import "antd/dist/antd.min.css";
import "./index.less";

class Skeleton extends React.PureComponent {
  static defaultProps = {
    ctx: {},
    topArea: [],
    leftArea: [],
    centerArea: [],
    rightArea: [],
    toolbarArea: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      dockSelectName: "",
    };
  }

  renderTopArea() {
    const { topArea, ctx } = this.props;
    const _leftArea = [];
    const _rightArea = [];
    const _centerArea = [];

    topArea.map((item) => {
      if (item.hidden || !React.isValidElement(item.content)) {
        return;
      }

      if (item.align === "left" || !item.align) {
        _leftArea.push(item);
      } else if (item.align === "center") {
        _centerArea.push(item);
      } else if (item.align === "right") {
        _rightArea.push(item);
      }
    });

    return (
      <>
        <div className="skeleton-top-area-left">
          {_leftArea.map((item, key) =>
            React.cloneElement(item.content, { ctx: ctx, key })
          )}
        </div>
        <div className="skeleton-top-area-center">
          {_centerArea.map((item, key) =>
            React.cloneElement(item.content, { ctx: ctx, key })
          )}
        </div>
        <div className="skeleton-top-area-right">
          {_rightArea.map((item, key) =>
            React.cloneElement(item.content, { ctx: ctx, key })
          )}
        </div>
      </>
    );
  }

  renderLeftArea() {
    const { leftArea, ctx } = this.props;
    const { dockSelectName } = this.state;
    const _topArea = [];
    const _bottomArea = [];
    let selectContent = null;

    leftArea.map((item) => {
      if (item.hidden || !React.isValidElement(item.content)) {
        return;
      }

      if (item.name === dockSelectName) {
        selectContent = item.content;
      }

      if (item.align === "top" || !item.align) {
        _topArea.push(item);
      } else if (item.align === "bottom") {
        _bottomArea.push(item);
      }
    });

    return (
      <>
        <div className="skeleton-left-area-dock">
          <div className="skeleton-left-area-dock-top">
            {_topArea.map((item, key) => (
              <div
                className={classnames("skeleton-left-area-dock-item", {
                  "skeleton-left-area-dock-item-selected":
                    item.name === dockSelectName,
                })}
                key={key}
                onClick={() => this.handleDockItemOnSelect(item)}
              >
                <Tooltip placement="right" title={item.title}>
                  <img
                    src={item.icon}
                    className={classnames({
                      "skeleton-left-area-dock-item-disabled": item.disabled,
                    })}
                  />
                </Tooltip>
              </div>
            ))}
          </div>
          <div className="skeleton-left-area-dock-bottom">
            {_bottomArea.map((item, key) => (
              <div
                className={classnames("skeleton-left-area-dock-item", {
                  "skeleton-left-area-dock-item-selected":
                    item.name === dockSelectName,
                })}
                key={key}
                onClick={() => this.handleDockItemOnSelect(item)}
              >
                <Tooltip placement="right" title={item.title}>
                  <img
                    src={item.icon}
                    className={classnames({
                      "skeleton-left-area-dock-item-disabled": item.disabled,
                    })}
                  />
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        {/* 下面这块可以加缓存处理 */}
        {/* class 后面加个 prop 来判断 */}
        {selectContent ? (
          <div
            className={classnames({
              "skeleton-left-area-panel-fixed": true,
              "skeleton-left-area-panel-float": false,
            })}
          >
            {React.cloneElement(selectContent, { ctx: ctx })}
          </div>
        ) : null}
      </>
    );
  }

  renderToolbar() {
    const { toolbarArea, ctx } = this.props;

    if (!toolbarArea.length) {
      return null;
    }

    return <div className="skeleton-center-toolbar"></div>;
  }

  renderCenterArea() {
    const { centerArea, ctx } = this.props;

    return (
      <div className="skeleton-center-area">
        {centerArea.map((item, key) => {
          if (item.hidden || !React.isValidElement(item.content)) {
            return;
          }

          return React.cloneElement(item.content, { ctx: ctx, key });
        })}
      </div>
    );
  }

  renderRightArea() {
    const { rightArea, ctx } = this.props;

    return (
      <div className="skeleton-right-area">
        {rightArea.map((item, key) => {
          if (item.hidden || !React.isValidElement(item.content)) {
            return;
          }

          return React.cloneElement(item.content, { ctx: ctx, key });
        })}
      </div>
    );
  }

  handleDockItemOnSelect(item) {
    const { dockSelectName } = this.state;

    if (item?.disabled) {
      return;
    }

    this.setState({
      dockSelectName: item?.name === dockSelectName ? "" : item?.name,
    });
  }

  render() {
    const { topArea, leftArea, centerArea, rightArea, ctx } = this.props;

    return (
      <div className="skeleton">
        <div className="skeleton-top-area">{this.renderTopArea()}</div>
        <div className="skeleton-bottom">
          <div className="skeleton-left-area">{this.renderLeftArea()}</div>
          <div className="skeleton-center">
            {this.renderToolbar()}
            {this.renderCenterArea()}
          </div>
          {this.renderRightArea()}
        </div>
      </div>
    );
  }
}

export default Skeleton;
