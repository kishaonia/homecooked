'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
  ///defines schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'UsersBuys';
    return queryInterface.bulkInsert(options, [
      {
    username: "janedoe",
    password:"password",
    DOB: "01/01/1990",
    address: "Las Vegas, Nevada",
    profilephoto: "https://as2.ftcdn.net/v2/jpg/02/95/65/61/1000_F_295656162_iBQtDyvZZxEPQYbBfvZRaUKWbiBR685f.jpg",
  }
], {});
},
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'UsersBuys';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['janedoe'] }
    }, {});
  }
};
