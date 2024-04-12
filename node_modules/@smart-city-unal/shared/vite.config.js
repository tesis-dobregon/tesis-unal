import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "/src/index.js", // Replace this with the actual path
      name: "shared",
      fileName: "shared",
      formats: ["cjs"],
    },
    // rollupOptions: {
    //   external: ["react", "react-dom"], // If your library depends on React, include it here
    //   output: {
    //     globals: {
    //       react: "React",
    //       "react-dom": "ReactDOM",
    //     },
    //   },
    // },
  },
});
