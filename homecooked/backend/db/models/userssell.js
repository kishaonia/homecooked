// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class UsersSell extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UsersSell.init({
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     DOB: DataTypes.INTEGER,
//     address: DataTypes.STRING,
//     profilephoto: DataTypes.STRING,
//     specialty: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'UsersSell',
//   });
//   return UsersSell;
// };

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersSell extends Model {
    static associate(models) {
      UsersSell.hasMany(models.Booking, { 
        foreignKey: 'userssellId'
      });
    }
  }
  UsersSell.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    DOB: DataTypes.INTEGER,
    address: DataTypes.STRING,
    profilephoto: DataTypes.STRING,
    specialty: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UsersSell',
  });
  return UsersSell;
};
