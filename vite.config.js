import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icons/poollog-icon.svg'],
            manifest: {
                name: 'PoolLog Mobile Web App',
                short_name: 'PoolLog',
                description: 'A phone-first progressive web app shell for managing pool care on the go.',
                theme_color: '#0d6c70',
                background_color: '#081a2d',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: '/icons/poollog-icon.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any'
                    },
                    {
                        src: '/icons/poollog-icon-maskable.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'maskable'
                    }
                ]
            }
        })
    ],
    server: {
        host: true,
        port: 4173,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
                secure: false
            }
        }
    }
});
