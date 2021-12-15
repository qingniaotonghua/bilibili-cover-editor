import React from "react";

class PanelLogo extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#f14767",
          fontWeight: "bold",
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            height: 35,
          }}
        >
          <path
            d="M129.36 208c131.28-4.88 760.4 0 760.4 0s122.88 25.6 126.16 160.4c-1.6 134.8 0 404.16 0 404.16s-6.8 131.6-124.56 152.48c-50.48-1.68-67.2 0-67.2 0s-3.36 55.36-52.96 56.16c-49.76 0.72-57.2-38.56-58.88-52.96-28.48 0-352.88 1.44-390.16 1.6h-3.52s-6 51.36-55.6 51.36c-49.76 0-52.16-42.56-55.52-51.28-32 0-75.68-0.8-75.68-0.8s-109.6-21.6-123.76-157.2c1.84-130.4 0.24-383.12 0.08-402.32v-1.28C7.84 362.88 1.04 242.56 129.36 208z m745.92 98.4H158.96c-21.76 0-39.44 17.28-39.44 38.56v452.4c0 21.36 17.68 38.56 39.44 38.56h716.32c21.76 0 39.36-17.28 39.36-38.56V344.88c0-21.28-17.6-38.48-39.36-38.48zM527.92 610.96c49.92 108.56 105.04 28.8 105.04 28.8l31.28 20.4s-58.48 94.16-135.6 22.96c-65.2 71.28-133.76-22.64-133.76-22.64l34.8-22.32 0.24 0.48c3.92 6.56 48.56 78.56 98-27.68zM413.68 399.68l16 79.76-210.08 40.72-17.76-79.76 211.84-40.72z m235.44 0l211.76 40.72-17.84 79.76-210.16-40.72 16.24-79.76z m85.6-337.92c8.4-6 9.68-15.6 34.32 6 21.76 19.2 12.96 36.48 10.56 40.24l-0.48 0.8-93.12 97.04H596.24S726.4 67.84 734.72 61.76zM328 58.16c8.32 6 138.48 144.08 138.48 144.08H376.72L283.68 105.2s-14.56-19.28 10-41.04c24.8-21.6 26-12 34.32-6z m0 0"
            fill="#F14767"
            p-id="5140"
          ></path>
        </svg>
        &nbsp;
        <span>封面编辑</span>
      </div>
    );
  }
}

export default PanelLogo;