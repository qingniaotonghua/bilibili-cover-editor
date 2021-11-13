import React from "react";
import ReactDOM from "react-dom";
import Skeleton from "./pages/Skeleton";
import DSLPanel from "./pages/DSLPanel";
import App from "./App";
import dsl from "./dsl";
import MobxStore from './store/MobxStore'
import { Provider} from 'mobx-react'

import "antd/dist/antd.css";
import "./index.css";

class C extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dsl: dsl,
    };

    MobxStore.dsl = JSON.stringify(dsl);
  }

  render() {
    console.log(">>> Index render");
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <App
          schema={this.state.dsl}
          style={{ flexGrow: 3 }}
        />
        <DSLPanel
          dsl={JSON.stringify(this.state.dsl, null, 2)}
          style={{ width: 500, flexGrow: 1, borderLeft: "1px solid #000" }}
          onSync={(value) => {
            // this.setState({ dsl: JSON.parse(value) });
            MobxStore.dsl = value;
          }}
        /> 
      </div>
    );
  }
}

ReactDOM.render(<Provider store={MobxStore}><C /></Provider>, document.getElementById("root"));
