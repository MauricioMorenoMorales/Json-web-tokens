const { Router } = require('express')
const router = Router()

const User = require('../models/User.model')

router.post('/signup', async (req, res, next) => {
	const { username, email, password } = req.body
	const user = await User.create({
		//? Esta es una forma alternativa a el "new user"
		username,
		email,
		password,
	})
	//! La encriptacion se hace desde la instancia no desde el modelo
	user.password = await user.encryptPassword(user.password)
	await user.save()
	res.json({ message: 'The user has been saved' })
	console.log(user)
})

router.post('/signin', (req, res, next) => {
	res.json('signin')
})

router.get('/me', (req, res, next) => {
	res.json('me')
})

module.exports = router
