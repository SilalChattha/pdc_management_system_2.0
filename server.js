const fs = require('fs')
const http = require('http')
const WebSocket = require('ws')

const readFile = (fileName) =>
	new Promise((resolve, reject) => {
		fs.readFile(fileName, 'utf-8', (readErr, fileContents) => {
			if (readErr) {
				reject(readErr)
			} else {
				resolve(fileContents)
			}
		})
	})

const delay = (seconds) => 
new Promise((resolve) => setTimeout(resolve, seconds * 1000))

const server = http.createServer(async (req, resp) => {
	console.log(`browser asked for ${req.url}`)
	if (req.url == '/myjs') {
		const clientJs = await readFile('client.js')
		resp.end(clientJs)
	} else if (req.url == '/home.css') {
		const homescreen = await readFile('home.css')
		resp.end(homescreen)
	} else if (req.url == '/client_menu.css') {
		const customer_menu = await readFile('customer_menu.css')
		resp.end(customer_menu)
	} else if (req.url == '/home.html') {
		const Home = await readFile('home.html')
		resp.end(Home)
	}
	else {
		resp.end('Error-Not found')
	}
})

server.listen(9000)

const wss = new WebSocket.Server({ port: 8080 })

wss.on(`connection`, (ws) => {
  console.log(`A user connected`)

  ws.on(`message`, (message) => {
    console.log(`received: ${message}`)
  })
})
