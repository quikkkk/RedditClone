const Router = require('express')
const router = new Router()
const Controller = require('../Controller/Controller')

router.post('/registration', Controller.Registration)
router.post('/login', Controller.Login)
router.post('/logout', Controller.Logout)

router.get('/user', Controller.User)

module.exports = router