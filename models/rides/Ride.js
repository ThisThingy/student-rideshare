const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fromLocation: {
    type: String,
    required: [true, 'From location is required'],
    trim: true
  },
  toLocation: {
    type: String,
    required: [true, 'To location is required'],
    trim: true
  },
  departureTime: {
    type: Date,
    required: [true, 'Departure time is required']
  },
  availableSeats: {
    type: Number,
    required: [true, 'Available seats is required'],
    min: [1, 'At least 1 seat must be available'],
    max: [7, 'Maximum 7 seats allowed']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', rideSchema);