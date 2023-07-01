// backend/routes/api/session.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { usersbuy } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];
const router = express.Router();
// backend/routes/api/session.js
// ...

// Log in
router.post(
    '/', validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await usersbuy.unscoped().findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential
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
            email: user.email,
            username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
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
        const { user } = req;
        if (user) {
            const safeUser = {
                id: user.id,
                email: user.email,
                username: user.username,
            };
            return res.json({
                user: safeUser
            });
        } else return res.json({ user: null });
    }
);



module.exports = router;