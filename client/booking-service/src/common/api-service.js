import axios from 'axios'
import Env from '../Env.js'

const client = axios.create({
  baseURL: Env.BACKEND_URL,
  json: true
})

const ApiService = {
  async execute(method, resource, data) {
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
  getAllBookings() {
    return this.execute('get', '/bookings')
  },
  getBookingsByUserId(userId) {
    return this.execute('get', `/bookings/${userId}`)
  },
  getBookingsByDate(date) {
    return this.execute('get', `/bookings/date/${date}`)
  },
  getBooking(id) {
    return this.execute('get', `/booking/${id}`)
  },
  createBooking(data) {
    return this.execute('post', '/booking', data)
  },
  updateBooking(data) {
    return this.execute('put', '/booking', data)
  },
  deleteBooking(id) {
    return this.execute('delete', `/booking/${id}`)
  },
  getAllRooms() {
    return this.execute('get', '/rooms')
  },
  getRoom(id) {
    return this.execute('get', `/room/${id}`)
  },
  createRoom(data) {
    return this.execute('post', '/room', data)
  },
  updateRoom(data) {
    return this.execute('put', '/room', data)
  },
  deleteRoom(id) {
    return this.execute('delete', `/room/${id}`)
  },
  getDayBooking(date) {
    return this.execute('get', `/day/${date}`)
  },
  book(id) {
    return this.execute('get', `/day/book/${id}`)
  },
  getMyBookings(userId) {
    return this.execute('get', `/day/mybooks/${userId}`)
  },
}

export default ApiService;