import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type ViteDevServer } from "vite";
import { Server } from 'socket.io'

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return

		const io = new Server(server.httpServer)

		io.on('connection', (socket) => {
			socket.emit('eventFromServer', 'Hello, World 👋')
		})
	}
}

export default defineConfig({
  plugins: [sveltekit(), webSocketServer],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/scss/variables.scss" as *;',
      },
    },
  },
});
