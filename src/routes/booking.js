const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userService = require('../services/userService');

/**
 * @route   POST /api/booking/hotel
 * @desc    Book a hotel
 * @access  Private
 */
router.post('/hotel', authMiddleware, async (req, res) => {
  try {
    const { hotelId, hotelData, checkIn, checkOut, guests, totalPrice } = req.body;
    
    // Create booking data
    const bookingData = {
      type: 'hotel',
      hotelId,
      hotelData,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      confirmationCode: `HTL${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    };
    
    // Save booking to user's trips
    const tripData = {
      destination: hotelData.location,
      startDate: checkIn,
      endDate: checkOut,
      bookings: [bookingData],
      status: 'upcoming',
      name: `Trip to ${hotelData.location}`
    };
    
    const result = await userService.saveTrip(req.user.uid, tripData);
    
    res.status(201).json({
      success: true,
      message: 'Hotel booking confirmed',
      booking: bookingData,
      tripId: result.tripId
    });
  } catch (error) {
    console.error('Hotel booking error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/booking/flight
 * @desc    Book a flight
 * @access  Private
 */
router.post('/flight', authMiddleware, async (req, res) => {
  try {
    const { flightId, flightData, passengers, totalPrice } = req.body;
    
    // Create booking data
    const bookingData = {
      type: 'flight',
      flightId,
      flightData,
      passengers,
      totalPrice,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      confirmationCode: `FLT${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    };
    
    // Save booking to user's trips
    const tripData = {
      destination: `${flightData.origin} to ${flightData.destination}`,
      startDate: flightData.departureTime,
      endDate: flightData.arrivalTime,
      bookings: [bookingData],
      status: 'upcoming',
      name: `Flight from ${flightData.origin} to ${flightData.destination}`
    };
    
    const result = await userService.saveTrip(req.user.uid, tripData);
    
    res.status(201).json({
      success: true,
      message: 'Flight booking confirmed',
      booking: bookingData,
      tripId: result.tripId
    });
  } catch (error) {
    console.error('Flight booking error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/booking/package
 * @desc    Book a travel package (hotel + flight)
 * @access  Private
 */
router.post('/package', authMiddleware, async (req, res) => {
  try {
    const { hotelData, flightData, checkIn, checkOut, guests, totalPrice } = req.body;
    
    // Create hotel booking
    const hotelBooking = {
      type: 'hotel',
      hotelId: hotelData.id,
      hotelData,
      checkIn,
      checkOut,
      guests,
      totalPrice: hotelData.price * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)),
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      confirmationCode: `HTL${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    };
    
    // Create flight booking
    const flightBooking = {
      type: 'flight',
      flightId: flightData.id,
      flightData,
      passengers: guests,
      totalPrice: flightData.price * guests,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      confirmationCode: `FLT${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    };
    
    // Save package booking to user's trips
    const tripData = {
      destination: hotelData.location,
      startDate: checkIn,
      endDate: checkOut,
      bookings: [hotelBooking, flightBooking],
      status: 'upcoming',
      name: `Package to ${hotelData.location}`
    };
    
    const result = await userService.saveTrip(req.user.uid, tripData);
    
    res.status(201).json({
      success: true,
      message: 'Travel package booking confirmed',
      bookings: [hotelBooking, flightBooking],
      tripId: result.tripId
    });
  } catch (error) {
    console.error('Package booking error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/booking/:bookingId
 * @desc    Get booking details
 * @access  Private
 */
router.get('/:bookingId', authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // This would typically fetch from a bookings collection
    // For now, we'll search through user trips
    const tripsResponse = await userService.getUserTrips(req.user.uid);
    const trips = tripsResponse.data || [];
    
    let booking = null;
    for (const trip of trips) {
      const foundBooking = trip.bookings?.find(b => b.confirmationCode === bookingId);
      if (foundBooking) {
        booking = foundBooking;
        break;
      }
    }
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/booking/:bookingId/cancel
 * @desc    Cancel a booking
 * @access  Private
 */
router.put('/:bookingId/cancel', authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // This would typically update the booking status
    // For now, we'll return a success message
    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
