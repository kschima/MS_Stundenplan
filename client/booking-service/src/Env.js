module.exports = {
    BACKEND_URL: process.env.NODE_ENV === 'production' ? "http://sgse2021.westeurope.cloudapp.azure.com/bookings/api:8080" : "http://localhost:8080/"
}