import React from "react";
import svgPage from "./static/page.svg";
import svgGroup from "./static/group.svg";
import svgLink from "./static/link.svg";
import "./TreeNode.css";

export default class TreeNode extends React.Component {
  static defaultProps = {
    type: "page",
    title: "",
  };

  constructor(props) {
    super(props);
  }

  renderIcon() {
    if (this.props.renderIcon) {
      return this.props.renderIcon(this.props.type, this.props);
    }

    const getSvg = {
      page: svgPage,
      group: svgGroup,
      link: svgLink,
    };

    return getSvg[this.props.type] ? (
      <img
        className="lp-react-tree-drag-TreeNode-icon"
        src={getSvg[this.props.type]}
      />
    ) : null;
  }

  renderTitle() {
    if (this.props.renderTitle) {
      return this.props.renderTitle(this.props.title, this.props);
    }

    return (
      <div
        className="lp-react-tree-drag-TreeNode-title"
        data-__lp_tree_node_id={this.props.id}
      >
        {this.props.renderTitle
          ? this.props.renderTitle(this.props.title, this.props)
          : this.props.title}
      </div>
    );
  }

  renderOp() {
    return (
      <div
        className="lp-react-tree-drag-TreeNode-op"
        data-__lp_tree_node_id={this.props.id}
      >
        {this.props.renderOp ? this.props.renderOp(this.props) : null}
      </div>
    );
  }

  render() {
    return (
      <div
        className="lp-react-tree-drag-TreeNode"
        onDragStart={(e) => {
          const dom = e.currentTarget;
          dom.classList.add("lp-react-tree-drag-TreeNode-dragStart");
          this.props.onTreeNodeDragStart && this.props.onTreeNodeDragStart(e);
        }}
        onDragEnd={(e) => {
          const dom = e.currentTarget;
          dom.classList.remove("lp-react-tree-drag-TreeNode-dragStart");
          this.props.onTreeNodeDragEnd && this.props.onTreeNodeDragEnd(e);
        }}
        onDragOver={(e) => e.preventDefault()}
        data-__lp_tree_node_id={this.props.id}
      >
        <div
          className="lp-react-tree-drag-TreeNode-left"
          draggable
          data-__lp_tree_node_id={this.props.id}
        >
          {this.renderIcon()}
          {this.renderTitle()}
        </div>
        {this.renderOp()}
      </div>
    );
  }
}
