const Booking = require('../models/Booking');
const Ride = require('../models/Ride');

exports.createBooking = async (req, res) => {
  try {
    console.log("SESSION:", req.session);

    const { rideId, seats, pickupLocation, notes } = req.body;

    // validate ride
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });

    // ensure user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: "User not logged in" });
    }

    // calculate price
    const totalPrice = seats * ride.price;

    const booking = new Booking({
      rideId,
      passengerId: req.session.userId,  // MUST be an ObjectId
      seats,
      totalPrice,
      pickupLocation,
      notes
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
