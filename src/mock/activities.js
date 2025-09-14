// Mock data for travel activities

module.exports = {
  activities: [
    {
      id: 'activity-001',
      name: 'Tegalalang Rice Terrace Tour',
      description: 'Explore the stunning UNESCO-listed rice terraces with a local guide who explains traditional Balinese farming techniques.',
      location: 'Ubud, Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1531592937781-344ad608fabf',
      rating: 4.7,
      price: 35,
      duration: '3 hours',
      eco_friendly: true,
      category: 'Nature',
      languages: ['English', 'Indonesian'],
      included: ['Local guide', 'Water', 'Rice farmer donation'],
      coordinates: {
        lat: -8.4321,
        lng: 115.2777
      }
    },
    {
      id: 'activity-002',
      name: 'Traditional Tea Ceremony Experience',
      description: 'Participate in an authentic Japanese tea ceremony led by a tea master in a historic teahouse.',
      location: 'Gion District, Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
      rating: 4.9,
      price: 60,
      duration: '1.5 hours',
      eco_friendly: true,
      category: 'Cultural',
      languages: ['English', 'Japanese'],
      included: ['Tea ceremony', 'Traditional sweets', 'Tea master guidance'],
      coordinates: {
        lat: 35.0037,
        lng: 135.7780
      }
    },
    {
      id: 'activity-003',
      name: 'Monteverde Cloud Forest Zipline Adventure',
      description: 'Soar through the cloud forest canopy on a series of ziplines, with stunning views of the rainforest below.',
      location: 'Monteverde, Costa Rica',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
      rating: 4.8,
      price: 85,
      duration: '3 hours',
      eco_friendly: true,
      category: 'Adventure',
      languages: ['English', 'Spanish'],
      included: ['Equipment', 'Safety briefing', 'Guides', 'Transportation from town center'],
      coordinates: {
        lat: 10.3010,
        lng: -84.8091
      }
    },
    {
      id: 'activity-004',
      name: 'Santorini Sunset Catamaran Cruise',
      description: 'Sail around the caldera on a luxury catamaran, swim in hot springs, and enjoy a BBQ dinner while watching the famous Santorini sunset.',
      location: 'Oia, Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
      rating: 4.9,
      price: 150,
      duration: '5 hours',
      eco_friendly: false,
      category: 'Cruise',
      languages: ['English', 'Greek'],
      included: ['Hotel pickup/drop-off', 'BBQ dinner', 'Open bar', 'Snorkeling equipment'],
      coordinates: {
        lat: 36.4618,
        lng: 25.3755
      }
    },
    {
      id: 'activity-005',
      name: 'Marrakech Medina Food Tour',
      description: 'Taste your way through the vibrant Marrakech medina, sampling local delicacies and learning about Moroccan cuisine.',
      location: 'Marrakech, Morocco',
      image: 'https://images.unsplash.com/photo-1531837763904-5d3cb2632ea3',
      rating: 4.6,
      price: 65,
      duration: '4 hours',
      eco_friendly: true,
      category: 'Food & Drink',
      languages: ['English', 'French', 'Arabic'],
      included: ['Food tastings', 'Local guide', 'Small group (max 8)'],
      coordinates: {
        lat: 31.6295,
        lng: -7.9811
      }
    },
    {
      id: 'activity-006',
      name: 'Milford Sound Scenic Flight and Cruise',
      description: 'Experience the majestic Milford Sound from both air and water with a scenic flight and cruise combination.',
      location: 'Queenstown, New Zealand',
      image: 'https://images.unsplash.com/photo-1578284808761-3a01a1121123',
      rating: 4.9,
      price: 395,
      duration: '4.5 hours',
      eco_friendly: false,
      category: 'Scenic',
      languages: ['English'],
      included: ['Scenic flight', 'Cruise', 'Lunch', 'Commentary'],
      coordinates: {
        lat: -45.0312,
        lng: 168.6626
      }
    }
  ]
};