module.exports = {
    DB_URL: process.env.NODE_ENV === 'production' ? "http://sgse2021.westeurope.cloudapp.azure.com/bookings/api:7687" : "bolt://0.0.0.0:7687"
}