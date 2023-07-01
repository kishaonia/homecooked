// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const { restoreUser } = require("../../utils/auth.js");
const bookingsRouter = require("./bookings.js")
const ratingsRouter = require("./ratings.js")
const usersBuyRouter = require("./usersbuys.js")
const usersSellsRouter = require("./usersells.js")

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/bookings', bookingsRouter);
router.use('/ratings', ratingsRouter);
router.use('/usersBuys', usersBuyRouter);
router.use('/usersSells', usersSellsRouter)




router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});



module.exports = router;