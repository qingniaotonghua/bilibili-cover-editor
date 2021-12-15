import React from "react";
import DSL from "./store";
import Skeleton from "./components/Skeleton";
import PanelGenImg from "./components/PanelGenImg";
import PanelAbout from "./components/PanelAbout";
import PanelLogo from "./components/PanelLogo";
import PanelComponent from "./components/PanelComponent";
import PanelAttribute from "./components/PanelAttribute";
import PanelCanvasAbsolute from "./components/PanelCanvasAbsolute";
import PanelResizeCanvas from "./components/PanelResizeCanvas";
import PanelOutline from "./components/PanelOutline";
import PanelDSL from "./components/PanelDSL";
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
const dslInstance = new DSL({
  page: [
    {
      id: "Picture_xJ27Wh9O3muw6haQPoKsO",
      componentName: "Picture",
      props: {
        url: "https://img.alicdn.com/imgextra/i2/O1CN01tHYs5C1tPxXFBHCot_!!6000000005895-0-tps-1898-1080.jpg",
        css: ":root{width: 100%;z-index:0;}",
      },
    },
    {
      id: "Title_Hq6ZGVsCSIvMP_kB8udl2",
      componentName: "Title",
      props: {
        title: "冲浪vlog",
        type: "jianshen",
        css: ":root {left:0px;top:191px;width:686px;z-index:1;}",
      },
    },
  ],
});
ctx.set("dsl", dslInstance);

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
              content: <PanelGenImg />,
            },
            {
              align: "right",
              content: <PanelAbout />,
            },
            {
              align: "center",
              content: <PanelResizeCanvas />,
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
              content: <PanelOutline />,
            },
            {
              name: "dsl",
              title: "DSL 面板",
              align: "bottom",
              icon: "https://img.alicdn.com/imgextra/i3/O1CN01liE81S23dpeqriifl_!!6000000007279-2-tps-128-128.png",
              content: <PanelDSL />,
              width: "500px",
              boxType: "float",
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
