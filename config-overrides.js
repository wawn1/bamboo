const {override, fixBabelImports, addWebpackAlias} = require("customize-cra");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    src: path.resolve(__dirname, "src"),
    components: path.resolve(__dirname, "src/components"),
    pages: path.resolve(__dirname, "src/pages"),
    common: path.resolve(__dirname, "src/common"),
    styles: path.resolve(__dirname, "src/common/styles"),
    api: path.resolve(__dirname, "src/api"),
    config: path.resolve(__dirname, "src/config"),
    store: path.resolve(__dirname, "src/store"),
  }),
  // antd按需加载
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  })
);
