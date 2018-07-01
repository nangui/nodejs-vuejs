// Import
var bcrypt = require('bcrypt')
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models')
var asyncLib = require('async')

// Constants
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/

// Routes
module.exports = {
  register: function (req, res) {
    // Params
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let login = req.body.login
    let password = req.body.password
    let bio = req.body.bio

    if (firstname == null || lastname == null || login == null || password == null) {
      return res.status(400).json({ 'error': 'Paramètre manquants' })
    }

    if (login.length >= 13 || login.length <= 4) {
      return res.status(400).json({ 'error': 'Le login est incorrect (il doit être compris entre 5 et 12) ' })
    }

    if (!EMAIL_REGEX.test(login)) {
      return res.status(400).json({'error': 'Email non valide.'})
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({'error': 'Mot de passe non valide.'})
    }

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          attributes: ['login'],
          where: {login: login}
        }).then((userFound) => {
          done(null, userFound)
        }).catch(() => {
          return res.status(500).json({'error': 'Impossible de vérifier l\'utilisateur'})
        })
      },
      function (userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (bcryptedPassword) {
            done(null, userFound, bcryptedPassword)
          })
        } else {
          return res.status(409).json({'error': 'Utilisateur existant dans la base.'})
        }
      },
      function (userFound, bcryptedPassword, done) {
        models.User.create({
          firstname: firstname,
          lastname: lastname,
          login: login,
          password: bcryptedPassword,
          bio: bio
        })
          .then(newUser => {
            done(newUser)
          }).catch(() => {
            return res.status(500).json({
              'error': 'Impossible d\'ajouter l\'utilisateur'
            })
          })
      },
      function (newUser) {
        if (newUser) {
          return res.status(201).json({
            'userId': newUser.uuid
          })
        } else {
          return res.status(500).json({'error': 'Implossible de créer l\'utilisateur'})
        }
      }
    ])
  },
  login: function (req, res) {
    // Params
    var login = req.body.login
    var password = req.body.password

    if (login == null || password == null) {
      return res.status(400).json({ 'error': 'Paramètre manquants' })
    }

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          where: {
            login: login
          }
        }).then(userFound => {
          done(null, userFound)
        }).catch(() => {
          return res.status(500).json({'error': 'Impossible de verifier L\'utilisateur '})
        })
      },
      function (userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function (errByCrypt, resByCrypt) {
            done(null, userFound, resByCrypt)
          })
        } else {
          return res.status(404).json({'error': 'Utilisateur inexistant en base.'})
        }
      },
      function (userFound, resByCrypt, done) {
        if (resByCrypt) {
          done(userFound)
        } else {
          return res.status(403).json({'error': 'Mot de passe non valide.'})
        }
      },
      function (userFound) {
        if (userFound) {
          return res.status(200).json({
            'userId': userFound.uuid,
            'token': jwtUtils.generateTokenForUser(userFound)
          })
        } else {
          return res.status(500).json({'error': 'Impossible de ce connecter.'})
        }
      }
    ])
  },
  getUserProfile: function (req, res) {
    // Get auth header
    let headerAuth = req.headers['authorization']
    let userId = jwtUtils.getUserId(headerAuth)

    if (userId < 0) {
      return res.status(400).json({'error': 'Mauvais token'})
    }

    models.User.findOne({
      attributes: ['firstname', 'lastname', 'login', 'password', 'bio'],
      where: {uuid: userId}
    }).then((user) => {
      if (user) {
        return res.status(200).json(user)
      } else {
        res.status(404).json({'error': 'Utilisateur introuvable.'})
      }
    }).catch(() => {
      res.status(500).json({ 'error': 'Impossible de chercher l\'utilisateur' })
    })
  }
}
