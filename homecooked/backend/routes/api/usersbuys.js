const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { sequelize, Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { UsersBuys, UsersSells, Bookings, Ratings } = require("../../db/models");




router.get('/', requireAuth, async (req, res, next) => {

    let address = await UsersBuys.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'lastName', 'firstName'],
        }
      ],
    });
  
    if (!address) {
      return res?.json({
        message: "Cuisine couldn't be found",
        statusCode: 404,
      });
    }
  
    let UsersBuys = [];
  
    address?.forEach(usersbuys => {
        UsersBuys.push(usersbuys.toJSON());
    });
  
    res.json({ UsersBuys });
  });
  
  router.put('/:id', requireAuth, async (req, res, next) => {
    const { address, profilephoto } = req.body;
    let usersbuys = await usersbuys.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!usersbuys) {
      return res.json({
        message: "User couldn't be found",
        statusCode: 404,
      });
    }
  
    if (usersbuys.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    let updateUsersBuys = await usersbuys.update({
      address,
      profilephoto
    });
  
    res.json(updateUsersBuys);
  });
  
  router.delete("/:id", requireAuth, async (req, res, next) => {
    let usersbuys = await UsersBuys.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!usersbuys) {
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
  
    if (usersbuys.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    await usersbuys.destroy();
  
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  );
  
  module.exports = router;
  