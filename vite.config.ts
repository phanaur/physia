import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    // GitHub Pages serves the site from https://<user>.github.io/physia/.
    base: '/physia/',
    plugins: [vue()]
});
