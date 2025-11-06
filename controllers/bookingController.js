const Booking = require('../models/Booking');
const Ride = require('../models/Ride');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { rideId, seatsBooked } = req.body;

    // Ensure ride exists
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found' });

    // Check available seats
    if (ride.availableSeats < seatsBooked) {
      return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }

    // Create booking
    const booking = new Booking({
      rideId,
      userId: req.user.id, // Assuming auth middleware adds req.user
      seatsBooked
    });

    await booking.save();

    // Decrease ride seats
    ride.availableSeats -= seatsBooked;
    await ride.save();

    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully', 
      booking 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('rideId', 'origin destination departureTime price')
      .sort({ bookingDate: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Restore seats on the ride
    const ride = await Ride.findById(booking.rideId);
    if (ride) {
      ride.availableSeats += booking.seatsBooked;
      await ride.save();
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    res.json({ success: true, message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
