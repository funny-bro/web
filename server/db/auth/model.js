const sequelize = require('../init')
const Sequelize = require('sequelize');

const Auth = sequelize.define('auth', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  statusNat: {
    type: Sequelize.STRING,
  },
  disable: {
    type: Sequelize.BOOLEAN,
  },
  cookieValue: {type: Sequelize.STRING, allowNull: false },
  ensid: {type: Sequelize.STRING, allowNull: false },
  enuid: {type: Sequelize.STRING, allowNull: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = Auth