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
   
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
  cuisine: "Filipino",
  dateBooking: "06/21/2023",
  timeDone: "ETA 10:00PM",
  budget: "150",
  carrier: "Dropped off",
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      cuisine: { [Op.in]: ['Filipino'] }
    }, {});
  }
};
