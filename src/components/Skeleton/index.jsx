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

    this.props.ctx.set("skeleton", this);

    this.handleFloatBoxOutsideClickHiden =
      this.handleFloatBoxOutsideClickHiden.bind(this);
    this.refLeftArea = this.leftAreaSelectItem = null;
  }

  componentDidMount() {
    window.addEventListener(
      "click",
      this.handleFloatBoxOutsideClickHiden,
      true
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "click",
      this.handleFloatBoxOutsideClickHiden,
      true
    );
  }

  handleFloatBoxOutsideClickHiden(e) {
    // left 区域的不处理
    if (this.refLeftArea?.contains(e.target)) {
      return;
    }

    // 不是 flat 类型的不处理
    if (this.leftAreaSelectItem?.boxType != "float") {
      return;
    }

    this.handleDockItemOnSelect();
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
    this.leftAreaSelectItem = {};

    leftArea.map((item) => {
      if (item.hidden || !React.isValidElement(item.content)) {
        return;
      }

      if (item.name === dockSelectName) {
        selectContent = item.content;
        this.leftAreaSelectItem = item;
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
        {/* todo: 在这里加入 悬浮显示类型，可拖动宽度效果 */}
        {selectContent ? (
          <div
            className={classnames({
              "skeleton-left-area-panel-fixed":
                this.leftAreaSelectItem?.boxType != "float",
              "skeleton-left-area-panel-float":
                this.leftAreaSelectItem?.boxType == "float",
            })}
            style={(() => {
              if (this.leftAreaSelectItem?.width) {
                return {
                  width: this.leftAreaSelectItem.width,
                };
              }
              return {};
            })()}
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

  openDockByName(name) {
    this.setState({
      dockSelectName: name,
    });
  }

  render() {
    const { topArea, leftArea, centerArea, rightArea, ctx } = this.props;

    return (
      <div className="skeleton">
        <div className="skeleton-top-area">{this.renderTopArea()}</div>
        <div className="skeleton-bottom">
          <div
            className="skeleton-left-area"
            ref={(_) => (this.refLeftArea = _)}
          >
            {this.renderLeftArea()}
          </div>
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
