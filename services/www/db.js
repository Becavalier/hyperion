const Sequelize = require('sequelize');
const db = require('../../.db-secret.json');

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
});

const PostComments = sequelize.define('t_blog_comments', {
  id: {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': true,
    'primaryKey': true,
    'autoIncrement' : true
  },
  postId: {
    'type': Sequelize.STRING(128),
    'allowNull': false,
    'unique': false
  },
  publisher: {
    'type': Sequelize.STRING(32),
    'allowNull': false,
    'defaultValue': '',
  },
  content: {
    'type': Sequelize.TEXT,
    'allowNull': false,
    'defaultValue': '',
  },
  ipAddr: {
    'type': Sequelize.STRING(16),
    'allowNull': false,
    'defaultValue': '',
  },
  publishTime: {
    'type': 'TIMESTAMP',
    'allowNull': false,
    'defaultValue': Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 't_blog_comments'
});

module.exports = { PostComments };
