// Mock data for hotels

module.exports = {
  hotels: [
    {
      id: 'hotel-001',
      name: 'Eco Bamboo Resort',
      description: 'Sustainable luxury bamboo villas nestled in the rice fields with stunning views.',
      location: 'Ubud, Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      rating: 4.8,
      price_per_night: 120,
      eco_friendly: true,
      amenities: ['Pool', 'Free WiFi', 'Breakfast included', 'Yoga classes', 'Organic restaurant'],
      coordinates: {
        lat: -8.5194,
        lng: 115.2641
      }
    },
    {
      id: 'hotel-002',
      name: 'Sakura Ryokan',
      description: 'Traditional Japanese inn with tatami floors, futon beds, and a peaceful garden.',
      location: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
      rating: 4.7,
      price_per_night: 180,
      eco_friendly: true,
      amenities: ['Onsen (hot spring)', 'Traditional breakfast', 'Tea ceremony', 'Yukata provided', 'Garden views'],
      coordinates: {
        lat: 35.0116,
        lng: 135.7681
      }
    },
    {
      id: 'hotel-003',
      name: 'Rainforest Eco Lodge',
      description: 'Sustainable cabins built from reclaimed materials, powered by solar energy.',
      location: 'Monteverde, Costa Rica',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      rating: 4.6,
      price_per_night: 95,
      eco_friendly: true,
      amenities: ['Wildlife tours', 'Farm-to-table dining', 'Hiking trails', 'Bird watching', 'Sustainable practices'],
      coordinates: {
        lat: 10.3010,
        lng: -84.8091
      }
    },
    {
      id: 'hotel-004',
      name: 'Caldera View Suites',
      description: 'Luxury cave suites carved into the cliffside with private pools and caldera views.',
      location: 'Oia, Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1455587734955-081b22074882',
      rating: 4.9,
      price_per_night: 350,
      eco_friendly: false,
      amenities: ['Private infinity pool', 'Sunset views', 'Spa services', 'Gourmet breakfast', 'Airport transfers'],
      coordinates: {
        lat: 36.4618,
        lng: 25.3755
      }
    },
    {
      id: 'hotel-005',
      name: 'Riad Marrakech',
      description: 'Traditional Moroccan house with an interior garden and rooftop terrace.',
      location: 'Marrakech, Morocco',
      image: 'https://images.unsplash.com/photo-1548710962-d5361a688066',
      rating: 4.5,
      price_per_night: 85,
      eco_friendly: false,
      amenities: ['Courtyard pool', 'Moroccan breakfast', 'Hammam', 'Rooftop dining', 'Medina tours'],
      coordinates: {
        lat: 31.6295,
        lng: -7.9811
      }
    },
    {
      id: 'hotel-006',
      name: 'Alpine Eco Retreat',
      description: 'Sustainable mountain lodge with panoramic views of the Southern Alps.',
      location: 'Queenstown, New Zealand',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      rating: 4.8,
      price_per_night: 210,
      eco_friendly: true,
      amenities: ['Mountain views', 'Organic breakfast', 'Hot tub', 'Hiking trails', 'Electric car charging'],
      coordinates: {
        lat: -45.0312,
        lng: 168.6626
      }
    }
  ]
};