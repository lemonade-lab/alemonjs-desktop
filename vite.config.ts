import { join } from 'node:path'
import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
// pkg is the package.json of the project
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })
  if (command === 'build') {
    rmSync('release/' + pkg.version, { recursive: true, force: true })
  }
  return {
    resolve: {
      alias: {
        '@src': join(__dirname, 'src')
      }
    },
    plugins: [
      react(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */ '[startup] Electron App')
            } else {
              options.startup(['.', '--no-sandbox'])
            }
          },
          vite: {
            build: {
              reportCompressedSize: false,
              minify: 'terser',
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys(pkg.dependencies ?? {})
              }
            }
          }
        },
        {
          entry: 'electron/preload/index.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.
            options.reload()
          },
          vite: {
            build: {
              outDir: 'dist-electron/preload',
              minify: 'terser',
              reportCompressedSize: false
            }
          }
        }
      ]),
      // Use Node.js API in the Renderer-process
      renderer()
    ],
    clearScreen: false,
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      minify: 'terser',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
