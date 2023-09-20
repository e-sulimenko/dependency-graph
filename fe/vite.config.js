import { defineConfig } from 'vite'
import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.resolve(__dirname, './data/raw_dependencies.txt'), 'utf-8');

console.log(data);

export default defineConfig({
  define: {
    dependencies: data.split('\n').slice(0, -1).map((item) => JSON.parse(item)),
  }
})