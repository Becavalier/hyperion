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

const PostComments = sequelize.define('t_post_comments', {
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
  },
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 't_post_comments'
});

const BookShelf = sequelize.define('t_book_shelf', {
  id: {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': true,
    'primaryKey': true,
    'autoIncrement' : true
  },
  name: {
    'type': Sequelize.STRING(64),
    'allowNull': true,
  },
  url: {
    'type': Sequelize.STRING(128),
    'allowNull': true,
  },
  total_pages: {
    'type': Sequelize.INTEGER,
    'allowNull': true,
  },
  current_page: {
    'type': Sequelize.INTEGER,
    'allowNull': true,
  },
  created_at: {
    'type': 'TIMESTAMP',
    'allowNull': false,
    'defaultValue': Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 't_book_shelf'
});

const TOVDAccount = sequelize.define('t_tovd_account', {
  id: {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': true,
    'primaryKey': true,
    'autoIncrement' : true
  },
  username: {
    'type': Sequelize.STRING(32),
    'allowNull': true,
    'unique': true
  },
  password: {
    'type': Sequelize.STRING(64),
    'allowNull': true,
  },
  created_at: {
    'type': 'TIMESTAMP',
    'allowNull': false,
    'defaultValue': Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 't_tovd_account'
});

const TOVDToken = sequelize.define('t_tovd_token', {
  id: {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': true,
    'primaryKey': true
  },
  token: {
    'type': Sequelize.STRING(64),
    'allowNull': true,
    'unique': true
  },
  expiry_at: {
    'type': 'TIMESTAMP',
    'allowNull': false,
    'defaultValue': Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 't_tovd_token'
});

const TOVDAppData = sequelize.define('t_tovd_app_data', {
  id: {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': true,
    'primaryKey': true
  },
  data: {
    'type': Sequelize.TEXT,
    'allowNull': true,
    'unique': false
  },
  updated_at: {
    'type': 'TIMESTAMP',
    'allowNull': false,
    'defaultValue': Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 't_tovd_app_data'
});

TOVDAccount.hasOne(TOVDToken, { foreignKey: 'id' });
TOVDToken.belongsTo(TOVDAccount, { foreignKey: 'id' })

module.exports = { 
  PostComments, 
  TOVDAccount,
  TOVDToken,
  TOVDAppData, 
  BookShelf,
};
