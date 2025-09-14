const express = require('express');
const axios = require('axios');
const router = express.Router();

// @route   GET api/hotels/search
// @desc    Search hotels by destination
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests, adults, children } = req.query;
    
    if (!destination) {
      return res.status(400).json({ message: 'Destination is required' });
    }

    // Check if LiteAPI key is available
    if (!process.env.LITEAPI_KEY) {
      console.log('LiteAPI key not found, using mock data');
      return res.json({
        message: 'Hotel search results for ' + destination,
        results: getMockHotels(destination)
      });
    }

    try {
      // Call LiteAPI for real hotel data
      const liteApiResponse = await axios.get('https://api.liteapi.travel/hotels/search', {
        headers: {
          'X-API-Key': process.env.LITEAPI_KEY
        },
        params: {
          location: destination,
          checkin: checkIn || new Date().toISOString().split('T')[0],
          checkout: checkOut || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          adults: adults || 1,
          children: children || 0,
          limit: 20
        }
      });

      // Transform LiteAPI response to our format
      const hotels = liteApiResponse.data.data?.map(hotel => ({
        id: hotel.hotel_id,
        name: hotel.name,
        location: `${hotel.address?.city}, ${hotel.address?.country}`,
        price: hotel.rates?.from || 0,
        currency: hotel.rates?.currency || 'USD',
        rating: hotel.rating || 0,
        image: hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        sustainable: hotel.amenities?.includes('eco-friendly') || false,
        amenities: hotel.amenities || [],
        address: hotel.address,
        coordinates: hotel.coordinates
      })) || [];

      res.json({
        message: `Found ${hotels.length} hotels in ${destination}`,
        results: hotels
      });

    } catch (apiError) {
      console.error('LiteAPI error:', apiError.response?.data || apiError.message);
      // Fallback to mock data if API fails
      res.json({
        message: 'Hotel search results for ' + destination,
        results: getMockHotels(destination)
      });
    }
  } catch (error) {
    console.error('Hotel search error:', error);
    res.status(500).json({ message: 'Error searching for hotels' });
  }
});

// Mock data fallback
function getMockHotels(destination) {
  return [
    {
      id: 'hotel1',
      name: 'Eco Resort & Spa',
      location: destination,
      price: 120,
      currency: 'USD',
      rating: 4.5,
      sustainable: true,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Eco-friendly']
    },
    {
      id: 'hotel2',
      name: 'Urban Boutique Hotel',
      location: destination,
      price: 95,
      currency: 'USD',
      rating: 4.2,
      sustainable: false,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      amenities: ['Free WiFi', 'Restaurant', 'Fitness Center']
    },
    {
      id: 'hotel3',
      name: 'Green Forest Lodge',
      location: destination,
      price: 85,
      currency: 'USD',
      rating: 4.7,
      sustainable: true,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      amenities: ['Nature Trails', 'Organic Restaurant', 'Solar Power', 'Recycling Program']
    }
  ];
}

module.exports = router;