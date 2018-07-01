// Imports
var jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'VOTRE_CHAINE_DE_CARACTERE_SECRETE'

// Exported functions
module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    }
    )
  },
  parseAuthorization: (authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null
  },
  getUserId: (authorization) => {
    let userId = -1
    let token = module.exports.parseAuthorization(authorization)
    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
        if (jwtToken != null) {
          userId = jwtToken.userId
        }
      } catch (err) {
        console.log(err)
      }
      return userId
    }
  }
}
