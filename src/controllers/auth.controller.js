const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

const User = require('../models/User.model')

//!||
router.post('/signup', async (req, res, next) => {
	try {
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
		const token = jwt.sign({ id: user._id }, process.env.SECRET, {
			expiresIn: 60 * 60 * 24,
		})
		res.json({ message: 'The user has been saved', auth: true, token: token })
		console.log(user)
	} catch (err) {
		console.error(`[Auth controller]: Error ${err}`)
	}
})

//!||
router.get('/me', async (req, res, next) => {
	try {
		const token = req.headers['x-access-token']
		if (!token) {
			return res.status(401).json({
				auth: false,
				message: 'No token provided',
			})
		}
		const decoded = jwt.verify(token, process.env.SECRET)
		const user = await User.findById(decoded.id, { password: 0 })
		if (!user) return res.status(404).send('No user found')
		console.log(user)
		res.json(user)
	} catch (err) {
		console.error(`[Auth controller]: Error ${err}`)
	}
})

//!||
router.post('/signin', async (req, res, next) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) return res.status(404).send('The email does not exist')
		const passwordIsValid = await user.validatePassword(password)
		res.json('signin')
	} catch (err) {
		console.error(`[Auth controller]: Error ${err}`)
	}
})

module.exports = router
