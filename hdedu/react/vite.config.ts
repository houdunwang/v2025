import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { analyzer } from 'vite-bundle-analyzer'
import { compression } from 'vite-plugin-compression2'
// https://vite.dev/config/
const isDev = process.env.NODE_ENV === 'development'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    analyzer(),
    compression({
      algorithm: 'gzip',
      threshold: 1024 * 50,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/hd": {
        target: "http://hdedu.test",
        changeOrigin: true,
      },
      "/images": {
        target: "http://hdedu.test",
        changeOrigin: true,
      },
      "/assets": {
        target: "http://hdedu.test",
        changeOrigin: true,
      },
      "/captcha": {
        target: "http://hdedu.test",
        changeOrigin: true,
      }
    }
  },
  base: isDev ? '/' : '/dist',
  build: {
    emptyOutDir: true,
    outDir: '../laravel/dist',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            const moduleName = id.split('node_modules/')[2].split('/')[0]
            return moduleName
          }
        }
      }
    }
  },
})
