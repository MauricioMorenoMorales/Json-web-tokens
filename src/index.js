const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')
require('./database')

async function init() {
	await app.listen(4444)
	console.log('server on port 4444')
}

init()
