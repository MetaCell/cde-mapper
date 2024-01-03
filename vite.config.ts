import {defineConfig} from 'vite'
import {resolve} from 'path'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    define: {
        'process.env': {}
    },
    plugins: [
        react(),
        dts({include: ['lib']}),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.tsx'),
            name: 'CdeSelector',
            fileName: 'cde-selector',
        },
        sourcemap: mode == 'dev',
    }}));
