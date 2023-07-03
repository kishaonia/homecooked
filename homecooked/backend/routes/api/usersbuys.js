const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { sequelize, Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { UsersBuy, UsersSells, Bookings, Ratings } = require("../../db/models");




router.get('/', requireAuth, async (req, res, next) => {

    let address = await UsersBuy.findAll({
      include: [
        {
          model: UsersBuy,
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
  
    address?.forEach(UsersBuy => {
        UsersBuys.push(UsersBuy.toJSON());
    });
  
    res.json({ UsersBuys });
  });
  
  router.put('/:id', requireAuth, async (req, res, next) => {
    const { address, profilephoto } = req.body;
    let usersbuy = await UsersBuy.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!usersbuy) {
      return res.json({
        message: "User couldn't be found",
        statusCode: 404,
      });
    }
  
    if (usersbuy.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    let updateUsersBuy = await UsersBuy.update({
      address,
      profilephoto
    });
  
    res.json(updateUsersBuy);
  });
  
  router.post(
    '/',
    async (req, res) => {
      const { DOB, specialty, cuisine, username, password, firstName, lastName, address, profilephoto } = req.body;
      const user = await UsersBuy.create({ firstName, lastName, username, password, cuisine, specialty, DOB, address, profilephoto  });
  
      const safeUser = {
        id: user.id,
        DOB: user.DOB,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,

        profilephoto: user.profilephoto
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );


  router.delete("/:id", requireAuth, async (req, res, next) => {
    let usersbuy = await UsersBuy.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!usersbuy) {
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
  
    if (usersbuy.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    await usersbuy.destroy();
  
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  );
  
  module.exports = router;
  
