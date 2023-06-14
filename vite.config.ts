import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron'
import * as path from 'path';
import svgrPlugin from 'vite-plugin-svgr';
import renderer from 'vite-plugin-electron-renderer';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsConfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: 'localhost',
    proxy: {
      '/api': {
        // target: 'http://localhost:8080',
        // target: 'https://nca-if.dev.site.sa/api',
        changeOrigin: false,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@context': path.resolve(__dirname, './src/context'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@services': path.resolve(__dirname, './src/services'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  plugins: [
    react(),
    tsConfigPaths(),
    checker({
      typescript: true,
    }),
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
          // instead of restarting the entire Electron App.
          options.reload()
        },
      },
    ]),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    createHtmlPlugin({}),
    renderer(),
  ],
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {},
    },
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
})
