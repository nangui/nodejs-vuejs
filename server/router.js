// Imports
var express = require('express')
var userCtrl = require('./routes/userCtrl')

// Router
exports.router = (function () {
  let apiRouter = express.Router()

  // Users routes
  apiRouter.route('/users/register/').post(userCtrl.register)
  apiRouter.route('/users/login/').post(userCtrl.login)
  apiRouter.route('/users/me/').get(userCtrl.getUserProfile)

  return apiRouter
})()
