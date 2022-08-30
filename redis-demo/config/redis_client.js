const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: 'redis-11558.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 11558,
    },
    password: '3SSs9XBYAVP5vDOwXKGvDYs0XTq3a6Mh'
});

redisClient.connect()
redisClient.on('error', (error) => { console.log("error", error.message) })
redisClient.on('connect', () => { console.log("Redis Connected...") })
redisClient.on('ready', () => { console.log("Redis Ready...") })

module.exports = redisClient;