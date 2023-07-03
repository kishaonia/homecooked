// backend/routes/api/session.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUserSell, restoreUserBuy } = require('../../utils/auth');
const { UsersBuy } = require('../../db/models');
const { UsersSell } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true }),
        // .notEmpty()
        // .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true }),
        // .withMessage('Please provide a password.'),
    handleValidationErrors
];

// backend/routes/api/session.js
// ...

// Log in
const validateSignup = [
   
    // check('username')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 4 })
    //     .withMessage('Please provide a username with at least 4 characters.'),
    // check('username')
    //     .not()
    //     .isEmail()
    //     .withMessage('Username cannot be an email.'),
    // check('password')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 6 })
    //     .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


router.post(
    '/', validateLogin, 
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await UsersBuy.unscoped().findOne({
            where: {
                [Op.or]: {
                    username: credential,
                }
            }
        });
        

        if (!user || (password !== user.password)) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = { credential: 'The provided credentials were invalid.' };
            return next(err);
        }

        const safeUser = {
            id: user.id,
            username: user.username,
        };
        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser,

        });



    }


);


router.post(
    '/seller', validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await UsersSell.unscoped().findOne({
            where: {
                [Op.or]: {
                    username: credential,

                }
            }
        });
        

        if (!user || (password !== user.password)) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = { credential: 'The provided credentials were invalid.' };
            return next(err);
        }

        const safeUser = {
            id: user.id,
            username: user.username,
        };
        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser,

        });



    }


);

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);





// Restore session user
router.get(
    '/',
    (req, res) => {
        const { usersbuy} = req;
        if (usersbuy) {
            const safeUser = {
                id: user.id,
                username: user.username,
            };
            return res.json({
                usersbuy: safeUser
            });
        } else return res.json({ user: null });
    }
);

// Restore session user
router.get(
    '/',
    (req, res) => {
        const { userssell } = req;
        if (userssell) {
            const safeUser = {
                id: user.id,
                username: user.username,
            };
            return res.json({
                userssell: safeUser
            });
        } else return res.json({ user: null });
    }
);



module.exports = router;
