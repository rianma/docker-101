require('dotenv').config()

const Koa = require('koa')
const mount = require('koa-mount')
const chokidar = require('chokidar')

const hotReload = process.env.HOT_RELOAD === 'true'

const startupServer = (server) => {
	const port = process.env.PORT || 6000
	server.listen(port, () => {
		console.log('Process pid: ' + process.pid)
		console.log('App listening on port ' + port)
	})
}

if (hotReload) {
	const watcher = chokidar.watch('./app')
	watcher.on('ready', () => {
		watcher.on('all', () => {
			console.log("Reloading server...")
			Object.keys(require.cache).forEach(function(id) {
				const localId = id.substr(process.cwd().length)
				const reg = /^\/app.*/
				if (reg.test(localId)) {
					delete require.cache[id]
				}
			})
			console.log('server reloaded.')
		})
	})

	const server = new Koa()

	server.use((ctx, next) => {
		const app = require('./app/index.js')
		const middleware = mount(app)
		return middleware(ctx, next)
	})

	startupServer(server)
} else {
	const server = require('./app/index.js')
	startupServer(server)
}
