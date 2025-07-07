const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Book = sequelize.define(
  'book',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Book;
