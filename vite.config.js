import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 5173,
        open: true,
        // OneDrive-synced folders lock files while syncing, which crashes the
        // native fs watcher (EBUSY). Polling avoids native watch handles, and we
        // ignore folders/files that OneDrive churns or that don't affect the app.
        watch: {
            usePolling: true,
            interval: 300,
            ignored: [
                '**/node_modules/**',
                '**/dist/**',
                '**/.git/**',
                '**/public/*.html',
            ],
        },
    },
});
