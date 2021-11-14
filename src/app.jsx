import React from "react";
import DSL from "./store";
import Skeleton from "./components/Skeleton";
import PanelSave from "./components/PanelSave";
import PanelImport from "./components/PanelImport";
import PanelLogo from "./components/PanelLogo";
import PanelComponent from "./components/PanelComponent";
import PanelAttribute from "./components/PanelAttribute";
import PanelCanvasAbsolute from "./components/PanelCanvasAbsolute";
import components from "./components/ComponentBanner";
import event from "./utils/SingleEventBus";

const ctx = new Map();
window.__ctx = ctx;

// ctx event
ctx.set("event", event);

// ctx component
ctx.set("component", new Map());
components.map((item) => {
  ctx.get("component").set(item.componentName, item);
});

// ctx dsl
// todo: absolute page 如何处理？ page 是一个页面的基本 root 元素，默认是应该存在的，是否由平台侧托管，而不依赖于物料侧？
const dslInstance = new DSL({
  page: [],
  // page: [
  //   {
  //     id: "Button_b82839fd",
  //     componentName: "Button",
  //     props: {
  //       content: "按钮1",
  //       onClick: {
  //         type: "JSFx",
  //         value: "function() {window.alert(123)}",
  //       },
  //     },
  //   },
  //   {
  //     id: "Image_c8sfklae",
  //     componentName: "Image",
  //     props: {
  //       src: "https://img.alicdn.com/imgextra/i2/O1CN01OrHrMH1JfEY8c1aW2_!!6000000001055-2-tps-700-700.png",
  //       width: 120,
  //     },
  //     css: "border: 1px solid #f00; top: 100px; left: 300px;",
  //   },
  // ],
});
ctx.set("dsl", dslInstance);

const standDSL = `[
  {
    "id": "Page_a8758f9d",
    "componentName": "Page",
    "props": {},
    "css": "",
    "children": [
      {
        "id": "Button_b82839fd",
        "componentName": "Button",
        "props": {
          "content": "按钮1",
          "onClick": {
            "type": "JSFx",
            "value": "function() {window.alert(123)}"
          }
        }
      },
      {
        "id": "Image_c8sfklae",
        "componentName": "Image",
        "props": {
          "src": "https://img.alicdn.com/imgextra/i2/O1CN01OrHrMH1JfEY8c1aW2_!!6000000001055-2-tps-700-700.png",
          "width": 120
        },
        "css": "position: absolute;"
      }
    ]
  }
]`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ctx.get("skeleton").openDockByName("component");
  }

  render() {
    return (
      <div className="app">
        <Skeleton
          ctx={ctx}
          topArea={[
            {
              content: <PanelLogo />,
            },
            {
              align: "right",
              content: <PanelImport />,
            },
            {
              align: "right",
              content: <PanelSave />,
            },
          ]}
          leftArea={[
            {
              name: "component",
              title: "组件面板",
              icon: "https://img.alicdn.com/imgextra/i2/O1CN01SpaA3D1dJ3gIsZltR_!!6000000003714-2-tps-128-128.png",
              content: <PanelComponent />,
            },
            {
              name: "outline",
              title: "大纲面板",
              hidden: false,
              icon: "https://img.alicdn.com/imgextra/i1/O1CN01ED4RnW1OVgMdOEZkH_!!6000000001711-2-tps-128-128.png",
              content: <div>大纲面板</div>,
            },
            {
              name: "dsl",
              title: "DSL 面板",
              align: "bottom",
              icon: "https://img.alicdn.com/imgextra/i3/O1CN01liE81S23dpeqriifl_!!6000000007279-2-tps-128-128.png",
              content: <div>DSL</div>,
            },
          ]}
          centerArea={[
            {
              content: <PanelCanvasAbsolute />,
            },
          ]}
          rightArea={[
            {
              content: <PanelAttribute />,
            },
          ]}
        />
      </div>
    );
  }
}

export default App;
