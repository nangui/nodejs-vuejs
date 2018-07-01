'use strict'

const faker = require('faker')
const bCrypt = require('bcrypt')
const uuid = require('uuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      uuid: uuid.v4(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      bio: faker.lorem.paragraph(),
      login: faker.internet.email(),
      password: bCrypt.hashSync('passer@2018', 10)
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
