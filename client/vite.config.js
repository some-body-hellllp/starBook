import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/Components"), // 경로 별칭 설정
      "@assets": path.resolve(__dirname, "./src/assets"), // 필요에 따라 추가
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.jsx"),
      },
      output: {
        format: "es", // 모듈 형식 설정
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
});
