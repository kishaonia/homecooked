// // 'use strict';
// // const {
// //   Model
// // } = require('sequelize');
// // module.exports = (sequelize, DataTypes) => {
// //   class Booking extends Model {
// //     /**
// //      * Helper method for defining associations.
// //      * This method is not a part of Sequelize lifecycle.
// //      * The `models/index` file will call this method automatically.
// //      */
// //     static associate(models) {
// //       // define association here
// //     }
// //   }
// //   Booking.init({
// //     cuisine: DataTypes.STRING,
// //     dateBooking: DataTypes.STRING,
// //     timeDone: DataTypes.STRING,
// //     budget: DataTypes.STRING,
// //     carrier: DataTypes.STRING
// //   }, {
// //     sequelize,
// //     modelName: 'Booking',
// //   });
// //   return Booking;
// // };

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Booking extends Model {
//     static associate(models) {

//       Booking.belongsTo(
//         models.UsersBuys, { 
//         foreignKey: 'buyerId'
//        });

//       Booking.belongsTo(models.UsersSells, { 
//         foreignKey: 'chefId'
//      });
//     }
//   }
//   Booking.init({
//     cuisine: DataTypes.STRING,
//     dateBooking: DataTypes.STRING,
//     timeDone: DataTypes.STRING,
//     budget: DataTypes.STRING,
//     carrier: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Booking',
//   });
//   return Booking;
// };


'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {


    static associate(models) {
      Booking.belongsTo(
        models.UsersBuy, {
        foreignKey: 'usersbuyId'
      });

      Booking.belongsTo(models.UsersSell, {
        foreignKey: 'userssellId'
      });
    }
  }

  Booking.init({
    cuisine: DataTypes.STRING,
    dateBooking: DataTypes.STRING,
    timeDone: DataTypes.STRING,
    budget: DataTypes.STRING,
    carrier: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
