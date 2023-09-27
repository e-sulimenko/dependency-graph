import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.resolve(__dirname, './data/raw_dependencies.txt'), 'utf-8');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    initialData: data.split('\n').slice(0, -1).map((item) => JSON.parse(item)),
  }
})
