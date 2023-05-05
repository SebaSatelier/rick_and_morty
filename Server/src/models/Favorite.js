const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Favorite', {
      id:{
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: false
      },
      name:{
         type: DataTypes.STRING,
      },
      status: {
         type: DataTypes.STRING,
      },
      species: {
         type: DataTypes.STRING,
      },
      gender:{
         type:  DataTypes.STRING,
      },
      // origin:{
      //    type: DataTypes.JSON
      // },
      image:{
         type: DataTypes.STRING
      }
   }, { timestamps: false });
};
