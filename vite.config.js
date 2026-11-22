import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

// nitro picks the deploy preset automatically (Vercel when built on Vercel,
// Node server otherwise: `node .output/server/index.mjs`).
export default defineConfig({
	server: { port: 5173 },
	plugins: [tanstackStart(), nitro(), viteReact()],
})
