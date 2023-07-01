// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class UsersBuy extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UsersBuy.init({
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     DOB: DataTypes.INTEGER,
//     address: DataTypes.STRING,
//     profilephoto: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'UsersBuy',
//   });
//   return UsersBuy;
// };

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersBuy extends Model {
    static associate(models) {
      UsersBuy.hasMany(models.Booking, {
         foreignKey: 'usersbuyId'
       });
    }
  }
  UsersBuy.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    DOB: DataTypes.STRING,
    address: DataTypes.STRING,
    profilephoto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UsersBuy',
  });
  return UsersBuy;
};
