import React from "react";
import { get } from "lodash";
import classnames from "classnames";
import TreeNode from "./TreeNode.jsx";
import svgArrow from "./static/arrow.svg";
import "./TreeGroup.css";

export default class TreeGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    this.setState({
      expanded: this.props.expanded,
    });
  }

  render() {
    const { children, expandedAll, showLine } = this.props;
    const { expanded } = this.state;
    return (
      <div
        className={classnames("lp-react-tree-drag-TreeGroup", {
          "lp-react-tree-drag-TreeGroup-collapse": !expanded,
        })}
        onDragOver={(e) => {
          e.currentTarget.lastChild.lastChild.classList.add(
            "lp-react-tree-drag-TreeGroup-enter"
          );
          e.stopPropagation();
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          e.currentTarget.lastChild.lastChild.classList.remove(
            "lp-react-tree-drag-TreeGroup-enter"
          );
        }}
      >
        <img
          className="lp-react-tree-drag-TreeGroup-arrow"
          src={svgArrow}
          onClick={() =>
            this.setState({
              expanded: !expanded,
            })
          }
        />
        <div className="lp-react-tree-drag-TreeGroup-node">
          <TreeNode
            {...this.props}
            onTreeNodeDragStart={(e) => {
              this.setState({
                expanded: false,
              });
            }}
            onTreeNodeDragEnd={(e) => {
              this.setState({
                expanded: true,
              });
            }}
          />
          <div
            className={classnames("lp-react-tree-drag-TreeGroup-node-ch", {
              "lp-react-tree-drag-TreeGroup-node-ch-line": showLine,
            })}
          >
            {(children || []).map((node, key) =>
              node.type == "group" ? (
                <TreeGroup
                  key={key}
                  {...node}
                  item={node}
                  expanded={expandedAll ? true : node.expanded}
                  expandedAll={expandedAll}
                  showLine={showLine}
                />
              ) : (
                <TreeNode {...node} item={node} key={key} />
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
