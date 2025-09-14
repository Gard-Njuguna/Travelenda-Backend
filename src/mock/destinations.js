// Mock data for popular travel destinations

module.exports = {
  destinations: [
    {
      id: 'dest-001',
      name: 'Bali, Indonesia',
      description: 'A tropical paradise known for its beautiful beaches, lush rice terraces, and vibrant culture.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      rating: 4.8,
      type: 'beach',
      eco_friendly: true,
      popular_activities: ['Surfing', 'Temple visits', 'Rice terrace trekking'],
      best_time_to_visit: 'April to October',
      average_cost_per_day: 50,
      coordinates: {
        lat: -8.4095178,
        lng: 115.188916
      }
    },
    {
      id: 'dest-002',
      name: 'Kyoto, Japan',
      description: 'Ancient city filled with classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      rating: 4.7,
      type: 'cultural',
      eco_friendly: true,
      popular_activities: ['Temple visits', 'Traditional tea ceremony', 'Bamboo forest walks'],
      best_time_to_visit: 'March to May and October to November',
      average_cost_per_day: 100,
      coordinates: {
        lat: 35.0116363,
        lng: 135.7680294
      }
    },
    {
      id: 'dest-003',
      name: 'Costa Rica',
      description: 'A biodiverse country with rainforests, beaches, river valleys, and hundreds of wildlife species.',
      image: 'https://images.unsplash.com/photo-1518259102261-b40117eabbc9',
      rating: 4.9,
      type: 'adventure',
      eco_friendly: true,
      popular_activities: ['Zip-lining', 'Wildlife watching', 'Surfing'],
      best_time_to_visit: 'December to April',
      average_cost_per_day: 70,
      coordinates: {
        lat: 9.7489169,
        lng: -83.7534256
      }
    },
    {
      id: 'dest-004',
      name: 'Santorini, Greece',
      description: 'Famous for its dramatic views, stunning sunsets, white-washed houses, and blue domed churches.',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      rating: 4.6,
      type: 'romantic',
      eco_friendly: false,
      popular_activities: ['Sunset watching', 'Wine tasting', 'Boat tours'],
      best_time_to_visit: 'April to November',
      average_cost_per_day: 150,
      coordinates: {
        lat: 36.3931562,
        lng: 25.4615092
      }
    },
    {
      id: 'dest-005',
      name: 'Marrakech, Morocco',
      description: 'A magical place known for its medina, gardens, palaces, and vibrant souks.',
      image: 'https://images.unsplash.com/photo-1597212720158-e21ad39d2e24',
      rating: 4.5,
      type: 'cultural',
      eco_friendly: false,
      popular_activities: ['Market exploration', 'Palace visits', 'Desert excursions'],
      best_time_to_visit: 'March to May and September to November',
      average_cost_per_day: 60,
      coordinates: {
        lat: 31.6294723,
        lng: -7.9810845
      }
    },
    {
      id: 'dest-006',
      name: 'New Zealand',
      description: 'Known for its stunning landscapes, national parks, and outdoor activities.',
      image: 'https://images.unsplash.com/photo-1469521669194-babb45599def',
      rating: 4.9,
      type: 'adventure',
      eco_friendly: true,
      popular_activities: ['Hiking', 'Bungee jumping', 'Lord of the Rings tours'],
      best_time_to_visit: 'December to February',
      average_cost_per_day: 120,
      coordinates: {
        lat: -40.900557,
        lng: 174.885971
      }
    }
  ]
};