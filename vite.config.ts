import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  resolve: {
    alias: [
      {
        // /@/xxxx  =>  src/xxx
        find: /@\//,
        replacement: pathResolve("src") + "/",
      },
      { find: /^~/, replacement: "" },
    ],
  },
  plugins: [
    react(),
    // antd
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#446FFC",
          "border-radius-base": "4px",
          "card-shadow":
            "box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          "tabs-card-head-background": "#F3F3F3",
        },
      },
    },
    modules: {},
  },
  define: {
    "process.env": process.env,
  },
});
