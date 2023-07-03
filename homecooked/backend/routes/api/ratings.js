const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { sequelize, Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { UsersBuy, UsersSell, Booking, Rating } = require("../../db/models");
const rating = require("../../db/models/rating");




router.get('/', requireAuth, async (req, res, next) => {

    let service = await Rating.findAll({
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
  
    if (!service) {
      return res?.json({
        message: "Ratings couldn't be found",
        statusCode: 404,
      });
    }
  
    let Ratings = [];
  
    service?.forEach(Rating => {
      Ratings?.push(Rating.toJSON());
    });
  
    res.json({ Ratings });
  });
  
  router.put('/:id', requireAuth, async (req, res, next) => {
    const { cuisine, dateBooking, timeDone, budget, carrier } = req.body;
    let rating = await Rating.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!rating) {
      return res.json({
        message: "Rating couldn't be found",
        statusCode: 404,
      });
    }
  
    if (rating.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    let updateRating = await rating.update({
      cuisine,
      dateBooking,
      timeDone,
      budget,
      carrier,
    });
  
    res.json(updateRating);
  });
  
  router.delete("/:id", requireAuth, async (req, res, next) => {
    let deleteRating = await Rating.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!deleteRating) {
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
  
    if (deleteRating.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }
  
    await deleteRating.destroy();
  
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  );
  
  module.exports = router;
  