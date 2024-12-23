import { defineConfig } from 'lvyjs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const includes = (val: string) => process.argv.includes(val)
const App = () => import('alemonjs').then(res => res.start('src/index.ts'))
export default defineConfig({
  alias: {
    entries: [{ find: '@src', replacement: join(__dirname, 'src') }]
  },
  plugins: [() => App]
})
