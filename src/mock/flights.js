// Mock data for flights

module.exports = {
  flights: [
    {
      id: 'flight-001',
      airline: 'Green Airways',
      flight_number: 'GA103',
      departure: {
        airport: 'JFK',
        city: 'New York',
        country: 'USA',
        terminal: 'T4',
        time: '2023-07-15T08:30:00Z'
      },
      arrival: {
        airport: 'DPS',
        city: 'Denpasar',
        country: 'Indonesia',
        terminal: 'International',
        time: '2023-07-16T14:45:00Z'
      },
      duration: '22h 15m',
      stops: 1,
      price: 850,
      eco_rating: 4.2,
      carbon_offset_available: true,
      carbon_emissions: '3.2 tons',
      available_seats: 12
    },
    {
      id: 'flight-002',
      airline: 'Nippon Air',
      flight_number: 'NH223',
      departure: {
        airport: 'LAX',
        city: 'Los Angeles',
        country: 'USA',
        terminal: 'B',
        time: '2023-07-15T11:20:00Z'
      },
      arrival: {
        airport: 'KIX',
        city: 'Osaka',
        country: 'Japan',
        terminal: '1',
        time: '2023-07-16T15:40:00Z'
      },
      duration: '12h 20m',
      stops: 0,
      price: 920,
      eco_rating: 3.8,
      carbon_offset_available: true,
      carbon_emissions: '4.1 tons',
      available_seats: 8
    },
    {
      id: 'flight-003',
      airline: 'Eco Flyer',
      flight_number: 'EF505',
      departure: {
        airport: 'MIA',
        city: 'Miami',
        country: 'USA',
        terminal: 'N',
        time: '2023-07-15T09:15:00Z'
      },
      arrival: {
        airport: 'SJO',
        city: 'San José',
        country: 'Costa Rica',
        terminal: 'Main',
        time: '2023-07-15T11:45:00Z'
      },
      duration: '3h 30m',
      stops: 0,
      price: 380,
      eco_rating: 4.5,
      carbon_offset_available: true,
      carbon_emissions: '1.2 tons',
      available_seats: 22
    },
    {
      id: 'flight-004',
      airline: 'Mediterranean Airlines',
      flight_number: 'MA762',
      departure: {
        airport: 'LHR',
        city: 'London',
        country: 'UK',
        terminal: '5',
        time: '2023-07-15T14:50:00Z'
      },
      arrival: {
        airport: 'JTR',
        city: 'Santorini',
        country: 'Greece',
        terminal: 'Main',
        time: '2023-07-15T20:30:00Z'
      },
      duration: '4h 40m',
      stops: 1,
      price: 320,
      eco_rating: 3.5,
      carbon_offset_available: true,
      carbon_emissions: '2.1 tons',
      available_seats: 5
    },
    {
      id: 'flight-005',
      airline: 'Atlas Air',
      flight_number: 'AT441',
      departure: {
        airport: 'CDG',
        city: 'Paris',
        country: 'France',
        terminal: '2E',
        time: '2023-07-15T07:10:00Z'
      },
      arrival: {
        airport: 'RAK',
        city: 'Marrakech',
        country: 'Morocco',
        terminal: '1',
        time: '2023-07-15T09:50:00Z'
      },
      duration: '3h 40m',
      stops: 0,
      price: 210,
      eco_rating: 3.2,
      carbon_offset_available: false,
      carbon_emissions: '1.8 tons',
      available_seats: 15
    },
    {
      id: 'flight-006',
      airline: 'Kiwi Pacific',
      flight_number: 'KP888',
      departure: {
        airport: 'SFO',
        city: 'San Francisco',
        country: 'USA',
        terminal: 'I',
        time: '2023-07-15T22:30:00Z'
      },
      arrival: {
        airport: 'AKL',
        city: 'Auckland',
        country: 'New Zealand',
        terminal: 'I',
        time: '2023-07-17T06:45:00Z'
      },
      duration: '13h 15m',
      stops: 0,
      price: 1050,
      eco_rating: 4.0,
      carbon_offset_available: true,
      carbon_emissions: '5.3 tons',
      available_seats: 3
    }
  ]
};