// Imports
var jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = '0jsdjf23djd8djql9djnfjsnn3njdZfjfnfbc1dcj8ddkds0jndjsjdvc5djdcw41rnn'

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
