import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const root = process.cwd()
  const { VITE_BASE_URL } = loadEnv(mode, root)

  process.env = { ...process.env, ...loadEnv(mode, root) }

  return defineConfig({
    base: VITE_BASE_URL,
    define: {
      'process.env': process.env,
    },
    build: {
      emptyOutDir: true,
    },
    plugins: [
      react(),
    ],
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
        '.less',
      ], // 忽略输入的扩展名
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          // additionalData: `@import "${resolve(__dirname, 'src/styles/_variables.less')}";`,
          // additionalData: `@import "${path.resolve(__dirname, 'src/styles/_variables.less')}";`,
          additionalData: '@import "src/styles/_variables.less";',
          javascriptEnabled: true,
        },
      },
    },
  })
}
