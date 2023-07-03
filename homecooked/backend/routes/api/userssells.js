const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { sequelize, Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { UsersBuys, UsersSell, Bookings, Ratings } = require("../../db/models");




router.get('/', requireAuth, async (req, res, next) => {

    let specialty = await UsersSell.findAll({
      include: [
        {
          model: UsersSell,
          attributes: ['id', 'lastName', 'firstName'],
        }
      ],
    });

    if (!specialty) {
      return res?.json({
        message: "Specialty couldn't be found",
        statusCode: 404,
      });
    }

    let UsersSells = [];

    specialty?.forEach(UsersSell => {
        UsersSells.push(UsersSell.toJSON());
    });

    res.json({ UsersSells });
  });

  router.put('/:id', requireAuth, async (req, res, next) => {
    const { profilephoto, specialty } = req.body;
    let userssell = await UsersSell.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!userssell) {
      return res.json({
        message: "User couldn't be found",
        statusCode: 404,
      });
    }

    if (userssell.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }

    let updateUsersSell = await UsersSell.update({
      profilephoto,
      specialty,
    });

    res.json(updateUsersSell);
  });


router.post(
  '/',
  async (req, res) => {
    const { DOB, specialty, cuisine, username, password, firstName, lastName, address, profilephoto } = req.body;
    const user = await UsersSell.create({ firstName, lastName, username, password, cuisine, specialty, DOB, address, profilephoto  });

    const safeUser = {
      id: user.id,
      DOB: user.DOB,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      cuisine: user.cuisine,
      specialty: user.specialty,
      profilephoto: user.profilephoto
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);
  router.delete("/:id", requireAuth, async (req, res, next) => {
    let userssell = await UsersSell.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!userssell) {
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }

    if (userssell.userId !== req.user.id) {
      return res.json({
        message: "Forbidden/not allowed",
        statusCode: 403,
      });
    }

    await userssell.destroy();

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  );

  module.exports = router;
