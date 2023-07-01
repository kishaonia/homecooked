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
    options.tableName = 'Ratings';
    return queryInterface.bulkInsert(options, [
      {
  service: "Good!",
  quality: "Amazing",
  communication: "Excellent",
  overall: "Excellent",
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
    options.tableName = 'Ratings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      service: { [Op.in]: ['Good!'] }
    }, {});
  }
};
