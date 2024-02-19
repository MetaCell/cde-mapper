import {defineConfig} from 'vite'
import {resolve} from 'path'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
    define: {
        'process.env': {}
    },
    plugins: [
        react(),
        dts({include: ['demo', 'lib']}),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.tsx'),
            name: 'CdeMapper',
            fileName: 'cde-mapper',
        },
        sourcemap: mode == 'dev',
        emptyOutDir: true,
        copyPublicDir: false,
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://scicrunch.org',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api/1/elastic/Interlex_pr/_search?key=I0FJ8VwuqLSVxfW586ICMpgzdT1m7miU'),
            },
        },
    },

}));
