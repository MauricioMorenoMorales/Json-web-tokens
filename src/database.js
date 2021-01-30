const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose
	.connect(
		`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@nodejsplatzi.cg57m.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true },
	)
	.then(db => console.log('Database connected'))
	.catch(error => console.error(error))
