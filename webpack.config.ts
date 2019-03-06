import path from "path";
//import TerserPlugin from "terser-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default () => ({
  optimization: {
    minimizer: [
      //     new TerserPlugin(),
    ]
  },
  entry: {
    app: "./assets/ts/index.tsx"
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "priv/static/js")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new CopyWebpackPlugin([{ from: "assets/static/", to: "../" }])],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  }
});
