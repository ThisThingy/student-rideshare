const Ride = require('../../models/Ride');

// Create a new ride
exports.createRide = async (req, res) => {
  try {
    const ride = new Ride({
      ...req.body,
      driverId: req.user.id // Assuming user is authenticated
    });
    
    await ride.save();
    res.status(201).json({ 
      success: true, 
      message: 'Ride created successfully', 
      ride 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'active' })
      .populate('driverId', 'username studentId')
      .sort({ departureTime: 1 });
    
    res.json({ 
      success: true, 
      rides 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get single ride
exports.getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate('driverId', 'username studentId phone');
    
    if (!ride) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ride not found' 
      });
    }
    
    res.json({ 
      success: true, 
      ride 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update ride
exports.updateRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!ride) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ride not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Ride updated successfully', 
      ride 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete ride
exports.deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.id);
    
    if (!ride) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ride not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Ride deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};