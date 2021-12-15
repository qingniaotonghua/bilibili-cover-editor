const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class ServiceWorkerRegHtmlPlugin {
  constructor(swName = "sw.reg.mgr.js") {
    this.swName = swName;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "ServiceWorkerRegHtmlPlugin",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tap(
          "ServiceWorkerRegHtmlPlugin",
          (data) => {
            if (
              !fs.existsSync(
                path.resolve(
                  fs.realpathSync(process.cwd()),
                  "public/" + this.swName
                )
              )
            ) {
              console.warn(
                "ServiceWorkerRegHtmlPlugin：未发现 public/" + this.swName
              );
              return;
            }

            data.bodyTags.push({
              tagName: "script",
              attributes: {
                type: "module",
              },
              innerHTML: `(function () {
                if (window.addEventListener) {
                  window.addEventListener("load", () => {
                    var script = document.createElement("script");
                    script.src = "${this.swName}?t=" + Date.now(); // 无缓存引用
                    script.async = true;
                    script.type = "text/javascript";
                    script.crossOrigin = "anonymous";
                    document.head.insertBefore(script, document.head.firstChild);
                  });
                }
              })();`,
            });
          }
        );
      }
    );
  }
}

module.exports = ServiceWorkerRegHtmlPlugin;
