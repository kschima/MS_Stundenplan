import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080/',
  json: true
})

export default {
    async execute (method, resource, data) {
      //let accessToken = await Vue.prototype.$auth.getAccessToken()
      return client({
        method,
        url: resource,
        data,
        headers: {
          //Authorization: `Bearer ${accessToken}`
        }
      }).then(req => {
        return req.data
      })
    },
    getBookings () {
      return this.execute('get', '/bookings')
    },
    getBookingsByUserId (userId) {
      return this.execute('get', `/booking/${userId}`)
    },
    getBooking (id) {
        return this.execute('get', `/booking/${id}`)
      },
    createBooking (data) {
      return this.execute('post', '/booking', data)
    },
    updateBooking (data) {
        return this.execute('put', '/booking', data)
    },
    deleteBooking (id) {
        return this.execute('delete', '/booking/${id}')
    },
    updatePost (id, data) {
      return this.execute('put', `/posts/${id}`, data)
    },
    getRooms () {
      return this.execute('get', '/rooms')
    },
    getRoom (id) {
      return this.execute('get', `/room/${id}`)
    },
    createRoom (data) {
      return this.execute('post', '/room', data)
    },
    updateRoom (data) {
        return this.execute('put', '/room', data)
    },
    deleteRoom (id) {
        return this.execute('delete', '/room/${id}')
    }
  }