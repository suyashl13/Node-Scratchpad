const DishModel = require('../../models/DishModel');
const DishRouter = require('express').Router();
const redisClient = require('../../config/redis_client')


DishRouter.get('/', async (req, res) => {
    try {
        await redisClient.publish('dish-watch', JSON.stringify({
            name: "Cup Cake",
            type: "Breakfast",
            cost: 20,
        }))
        if ((await redisClient.KEYS('*')).includes('dishes')) {
            console.log("Cached")
            const a = await redisClient.json.get("dishes", '$');
            res.json(a);
        } else {
            console.log("Not Cached");
            const result = await DishModel.find();
            await redisClient.json.set("dishes", '$', result);
            return res.json(result);
        }
    } catch (error) {
        return res.status(400).json({
            'err': error.message
        });
    }
})


DishRouter.post('/', async (req, res) => {

    const { name, type, cost } = req.body;
    const newDish = new DishModel({
        name, type, cost
    });

    try {
        await newDish.save();
        await redisClient.publish('dish-watch', JSON.stringify(newDish))
        await redisClient.json.arrAppend('dishes', '$', newDish);
        return res.json(newDish);
    } catch (error) {
        return res.status(400).json({
            'err': error.message
        });
    }
})


module.exports = DishRouter;