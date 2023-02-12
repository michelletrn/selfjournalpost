const router = require('express').Router();
const userRoutes = require('./User-routes');
const goalRoutes = require('./Goal-routes');
const entryRoutes = require('./Entry-routes');
const commentRoutes = require('./Comment-routes');

router.use('/entry', entryRoutes);
router.use('/user', userRoutes);
router.use('/goal', goalRoutes);
router.use('/comment', commentRoutes);

module.exports = router;