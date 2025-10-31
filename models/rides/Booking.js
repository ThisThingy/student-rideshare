const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true
  },
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seatsBooked: {
    type: Number,
    required: [true, 'Seats booked is required'],
    min: [1, 'At least 1 seat must be booked']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);