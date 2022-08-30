const DishRouter = require('./dish_router/DishRouter');
const BaseRouter = require('express').Router()


BaseRouter.use('/dish', DishRouter)


module.exports = BaseRouter;