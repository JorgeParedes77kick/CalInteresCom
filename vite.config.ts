import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'), // Esto permite usar "src/" como base absoluta      assets: path.resolve(__dirname,"src/assets"),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'src/constants'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      models: path.resolve(__dirname, 'src/models'),
      pages: path.resolve(__dirname, 'src/pages'),
      redux: path.resolve(__dirname, 'src/redux'),
      services: path.resolve(__dirname, 'src/services'),
      'styled-components': path.resolve(__dirname, 'src/styled-components'),
      test: path.resolve(__dirname, 'src/test'),
      types: path.resolve(__dirname, 'src/types'),
      utilities: path.resolve(__dirname, 'src/utilities'),
      __test__: path.resolve(__dirname, 'src/__test__'),
    },
  },
});
