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
          "primary-color": "#683bc9",
        },
      },
    },
    modules: {},
  },
});
