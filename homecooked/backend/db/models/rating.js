// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class rating extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   rating.init({
//     service: DataTypes.STRING,
//     quality: DataTypes.STRING,
//     communication: DataTypes.STRING,
//     overall: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'rating',
//   });
//   return rating;
// };
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.UsersSell, { 
        foreignKey: 'userssellId',
         });
      Rating.belongsTo(models.UsersBuy, { 
        foreignKey: 'usersbuyId'
        });
    }
  }
  Rating.init({
    service: DataTypes.STRING,
    quality: DataTypes.STRING,
    communication: DataTypes.STRING,
    overall: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
