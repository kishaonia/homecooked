const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { sequelize, Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { UsersBuys, UsersSells, Bookings, Ratings } = require("../../db/models");




router.get('/', requireAuth, async (req, res, next) => {

    let cuisine = await Bookings.findAll({
      include: [
        {
          model: UsersBuys,
          attributes: ['id', 'lastName', 'firstName'],
        },
        {
            model: UsersSells,
            attributes: ['id', 'lastName', 'firstName'],
          }
      ],
    });
  
    if (!cuisine) {
      return res?.json({
        message: "Cuisine couldn't be found",
        statusCode: 404,
      });
    }
  
    let Bookings = [];
  
    cuisine?.forEach(booking => {
      Bookings.push(booking.toJSON());
    });
  
    res.json({ Bookings });
});
  
  router.put('/:id', requireAuth, async (req, res, next) => {
    const { cuisine, dateBooking, timeDone, budget, carrier } = req.body;
    let booking = await booking.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!booking) {
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
  
    if (booking.usersbuysId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    let updateBooking = await booking.update({
      cuisine,
      dateBooking,
      timeDone,
      budget,
      carrier,
    });
  
    res.json(updateBooking);
  });
  
  router.delete("/:id", requireAuth, async (req, res, next) => {
    let booking = await booking.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!booking) {
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
  
    if (booking.usersbuysId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    await booking.destroy();
  
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  );
  
  module.exports = router;
  