const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { sequelize, Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { UsersBuy, UsersSell, Booking, Ratings } = require("../../db/models");




router.get('/', requireAuth, async (req, res, next) => {

    let cuisine = await Booking.findAll({
      include: [
        {
          model: UsersBuy,
          attributes: ['id', 'lastName', 'firstName'],
        },
        {
            model: UsersSell,
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
      Booking.push(booking.toJSON());
    });
  
    res.json({ Bookings });
});
  
  router.put('/:id', requireAuth, async (req, res, next) => {
    const { cuisine, dateBooking, timeDone, budget, carrier } = req.body;
    let booking = await Booking.findOne({
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
    let deleteBooking = await Booking.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!deleteBooking) {
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
  
    if (deleteBooking.usersbuysId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    await deleteBooking.destroy();
  
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  );
  
  module.exports = router;
  