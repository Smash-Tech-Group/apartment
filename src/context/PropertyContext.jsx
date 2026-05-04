import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

import house1 from "../assets/house1.webp"
import house2 from "../assets/house2.webp"
import house3 from "../assets/house3.webp"
import house4 from "../assets/house4.webp"
import house5 from "../assets/house5.webp"

import house6 from "../assets/house02.webp"
import house7 from "../assets/house03.webp"
import house8 from "../assets/house04.webp"
import house9 from "../assets/house05.webp"
import house10 from "../assets/house6.webp"
import house11 from "../assets/house7.webp"
import house12 from "../assets/house8.webp"
import house13 from "../assets/house10.webp"
import house14 from "../assets/house11.webp"
import house15 from "../assets/house12.webp"

// Import amenity images
import wifi from "../assets/wifi.svg";
import airCondition from "../assets/air.svg";
import parking from "../assets/parking.svg";
import tv from "../assets/tv.svg";
import pool from "../assets/swim.svg";
import wash from "../assets/wash.svg";
// import gym from "../assets/gym.svg";
// import concierge from "../assets/concierge.svg";
// import garden from "../assets/garden.svg";
// import balcony from "../assets/balcony.svg";
// import staffQuarters from "../assets/staff-quarters.svg";
// import fence from "../assets/fence.svg";
// import boysQuarters from "../assets/boys-quarters.svg";
// import roomService from "../assets/room-service.svg";
// import restaurant from "../assets/restaurant.svg";
// import workDesk from "../assets/work-desk.svg";
// import meetingRoom from "../assets/meeting-room.svg";
// import laundry from "../assets/laundry.svg";
// import cableTV from "../assets/cable-tv.svg";
// import terrace from "../assets/terrace.svg";
// import butler from "../assets/butler.svg";
// import privateParking from "../assets/private-parking.svg";
// import workArea from "../assets/work-area.svg";
// import playground from "../assets/playground.svg";

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  // Amenity icons mapping - now using images instead of emojis
  const amenityIcons = {
    'WiFi': wifi,
    'Air Conditioning': airCondition,
    'Parking': parking,
    'Tv': tv,
    'Swimming Pool': pool,
    'Washing Machine': wash,
    // 'Gym': gym,
    // 'Concierge': concierge,
    // 'Pool': pool,
    // 'Garden': garden,
    // 'Balcony': balcony,
    // 'Staff Quarters': staffQuarters,
    // 'Fence': fence,
    // 'Large Garden': garden, // reusing garden image
    // 'Boys Quarters': boysQuarters,
    // 'Room Service': roomService,
    // 'Restaurant': restaurant,
    // 'Work Desk': workDesk,
    // 'Meeting Room Access': meetingRoom,
    // 'Laundry': laundry,
    // 'Cable TV': cableTV,
    // 'Private Pool': pool, // reusing pool image
    // 'Terrace': terrace,
    // 'Butler Service': butler,
    // 'Private Parking': privateParking,
    // 'Private Garden': garden, // reusing garden image
    // 'Small Garden': garden, // reusing garden image
    // 'Work Area': workArea,
    // 'Playground': playground
  };

  // All properties data - your existing mock data with full details and images
  const [allProperties] = useState({
    'New Apartments': [
      {
        id: 1,
        images: [house1, house2, house3, house4, house9],
        type: '2 Bedroom Apartment',
        location: 'Gwarinpa, Abuja',
        posted: 'Posted 1 month ago',
        amount: 45000,
        rating: 4.8,
        isNew: true,
        description: 'Beautiful 2-bedroom apartment in the heart of Gwarinpa. This modern apartment features spacious rooms, contemporary finishes, and excellent amenities. Perfect for comfortable living with easy access to shopping centers, schools, and transportation.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Tv', icon: amenityIcons['Tv'] },
          { name: 'Swimming Pool', icon: amenityIcons['Swimming Pool'] },
          { name: 'Washing Machine', icon: amenityIcons['Washing Machine'] },
          { name: 'Washing Machine', icon: amenityIcons['Washing Machine'] },
          { name: 'Washing Machine', icon: amenityIcons['Washing Machine'] },
          { name: 'Washing Machine', icon: amenityIcons['Washing Machine'] }

        ]
      },
      {
        id: 2,
        images: [house4, house5, house6],
        type: '3 Bedroom Apartment',
        location: 'Maitama, Abuja',
        posted: 'Posted 3 weeks ago',
        amount: 65000,
        rating: 4.6,
        isNew: false,
        description: 'Luxury 3-bedroom apartment in prestigious Maitama district. Features high-end finishes, panoramic city views, and premium amenities.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Gym', icon: amenityIcons['Gym'] },
          { name: 'Concierge', icon: amenityIcons['Concierge'] }
        ]
      },
      {
        id: 3,
        images: [house7, house8, house9],
        type: '1 Bedroom Apartment',
        location: 'Wuse 2, Abuja',
        posted: 'Posted 2 weeks ago',
        amount: 35000,
        rating: 4.5,
        isNew: true,
        description: 'Cozy 1-bedroom apartment perfect for young professionals. Modern design with all essential amenities in a prime location.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] }
        ]
      }
    ],
    'Studio Apartments': [
      {
        id: 4,
        images: [house10, house11, house12],
        type: 'Modern Studio',
        location: 'Garki, Abuja',
        posted: 'Posted 1 week ago',
        amount: 25000,
        rating: 4.3,
        isNew: true,
        description: 'Modern studio apartment with open-plan design. Perfect for singles or couples looking for a stylish and affordable living space.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] }
        ]
      },
      {
        id: 5,
        images: [house13, house14, house15],
        type: 'Luxury Studio',
        location: 'Asokoro, Abuja',
        posted: 'Posted 2 months ago',
        amount: 40000,
        rating: 4.7,
        isNew: false,
        description: 'Luxury studio in exclusive Asokoro. High-end finishes and premium amenities in a prestigious neighborhood.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Pool', icon: amenityIcons['Pool'] },
          { name: 'Gym', icon: amenityIcons['Gym'] }
        ]
      },
      {
        id: 6,
        images: [house1, house3, house5],
        type: 'Cozy Studio',
        location: 'Kubwa, Abuja',
        posted: 'Posted 1 month ago',
        amount: 20000,
        rating: 4.2,
        isNew: false,
        description: 'Affordable and cozy studio apartment in Kubwa. Great for budget-conscious individuals seeking comfort.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] }
        ]
      }
    ],
    'Duplex': [
      {
        id: 7,
        images: [house2, house4, house6],
        type: '4 Bedroom Duplex',
        location: 'Gwarinpa, Abuja',
        posted: 'Posted 2 months ago',
        amount: 85000,
        rating: 4.9,
        isNew: false,
        description: 'Spacious 4-bedroom duplex with modern design. Perfect for large families with ample space and premium amenities.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Garden', icon: amenityIcons['Garden'] },
          { name: 'Balcony', icon: amenityIcons['Balcony'] }
        ]
      },
      {
        id: 8,
        images: [house8, house10, house12],
        type: '5 Bedroom Duplex',
        location: 'Maitama, Abuja',
        posted: 'Posted 1 month ago',
        amount: 120000,
        rating: 4.8,
        isNew: true,
        description: 'Luxurious 5-bedroom duplex in prime Maitama location. Exceptional space and high-end finishes throughout.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Pool', icon: amenityIcons['Pool'] },
          { name: 'Garden', icon: amenityIcons['Garden'] },
          { name: 'Staff Quarters', icon: amenityIcons['Staff Quarters'] }
        ]
      },
      {
        id: 9,
        images: [house14, house1, house7],
        type: '3 Bedroom Duplex',
        location: 'Jahi, Abuja',
        posted: 'Posted 3 weeks ago',
        amount: 70000,
        rating: 4.6,
        isNew: true,
        description: 'Beautiful 3-bedroom duplex in the developing Jahi district. Modern amenities with great value for money.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Balcony', icon: amenityIcons['Balcony'] }
        ]
      }
    ],
    'Bungalow': [
      {
        id: 10,
        images: [house3, house9, house11],
        type: '3 Bedroom Bungalow',
        location: 'Lugbe, Abuja',
        posted: 'Posted 1 month ago',
        amount: 50000,
        rating: 4.4,
        isNew: true,
        description: 'Charming 3-bedroom bungalow with private compound. Perfect for families who prefer single-level living.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Garden', icon: amenityIcons['Garden'] },
          { name: 'Fence', icon: amenityIcons['Fence'] }
        ]
      },
      {
        id: 11,
        images: [house5, house13, house15],
        type: '2 Bedroom Bungalow',
        location: 'Kuje, Abuja',
        posted: 'Posted 2 weeks ago',
        amount: 35000,
        rating: 4.1,
        isNew: true,
        description: 'Cozy 2-bedroom bungalow in peaceful Kuje area. Great for small families seeking tranquility.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Garden', icon: amenityIcons['Garden'] }
        ]
      },
      {
        id: 12,
        images: [house6, house8, house2],
        type: '4 Bedroom Bungalow',
        location: 'Gwagwalada, Abuja',
        posted: 'Posted 3 months ago',
        amount: 60000,
        rating: 4.3,
        isNew: false,
        description: 'Spacious 4-bedroom bungalow with large compound. Ideal for large families who value space and privacy.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Parking', icon: amenityIcons['Parking'] },
          { name: 'Security', icon: amenityIcons['Security'] },
          { name: 'Large Garden', icon: amenityIcons['Large Garden'] },
          { name: 'Boys Quarters', icon: amenityIcons['Boys Quarters'] }
        ]
      }
    ],
    'Hotel': [
      {
        id: 13,
        images: [house4, house10, house14],
        type: 'Luxury Hotel Room',
        location: 'Central Area, Abuja',
        posted: 'Posted 1 week ago',
        amount: 15000,
        rating: 4.7,
        isNew: true,
        description: 'Luxury hotel room in the heart of Abuja. Perfect for business travelers and short stays.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Room Service', icon: amenityIcons['Room Service'] },
          { name: 'Concierge', icon: amenityIcons['Concierge'] },
          { name: 'Gym', icon: amenityIcons['Gym'] },
          { name: 'Restaurant', icon: amenityIcons['Restaurant'] }
        ]
      },
      {
        id: 14,
        images: [house7, house12, house1],
        type: 'Business Hotel Suite',
        location: 'Garki, Abuja',
        posted: 'Posted 2 days ago',
        amount: 25000,
        rating: 4.5,
        isNew: false,
        description: 'Business hotel suite with work area and premium amenities. Ideal for extended business stays.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Work Desk', icon: amenityIcons['Work Desk'] },
          { name: 'Meeting Room Access', icon: amenityIcons['Meeting Room Access'] },
          { name: 'Laundry', icon: amenityIcons['Laundry'] }
        ]
      },
      {
        id: 15,
        images: [house9, house11, house15],
        type: 'Budget Hotel Room',
        location: 'Wuse, Abuja',
        posted: 'Posted 1 week ago',
        amount: 8000,
        rating: 4.0,
        isNew: true,
        description: 'Affordable hotel room with essential amenities. Great value for budget-conscious travelers.',
        amenities: [
          { name: 'WiFi', icon: amenityIcons['WiFi'] },
          { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
          { name: 'Cable TV', icon: amenityIcons['Cable TV'] },
          { name: 'Room Service', icon: amenityIcons['Room Service'] }
        ]
      }
    ]
  });

  // Explore properties with full details and images
  const [exploreProperties] = useState([
    {
      id: 16,
      images: [house13, house5, house8],
      type: '4 Bedroom Duplex',
      location: 'Gwarinpa, Abuja',
      posted: 'Posted 2 months ago',
      amount: 55000,
      rating: 6.0,
      isNew: false,
      description: 'Spacious 4-bedroom duplex with modern amenities and beautiful garden. Perfect for families looking for comfort and luxury.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Garden', icon: amenityIcons['Garden'] },
        { name: 'Balcony', icon: amenityIcons['Balcony'] }
      ]
    },
    {
      id: 17,
      images: [house2, house6, house12],
      type: '2 Bedroom Apartment',
      location: 'Maitama, Abuja',
      posted: 'Posted 1 month ago',
      amount: 75000,
      rating: 5.8,
      isNew: true,
      description: 'Premium 2-bedroom apartment in exclusive Maitama. High-end finishes and exceptional location.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Pool', icon: amenityIcons['Pool'] },
        { name: 'Concierge', icon: amenityIcons['Concierge'] }
      ]
    },
    {
      id: 18,
      images: [house4, house9, house14],
      type: '3 Bedroom Bungalow',
      location: 'Asokoro, Abuja',
      posted: 'Posted 3 weeks ago',
      amount: 90000,
      rating: 5.9,
      isNew: false,
      description: 'Luxury 3-bedroom bungalow in prestigious Asokoro. Private garden and premium amenities.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Private Garden', icon: amenityIcons['Private Garden'] },
        { name: 'Pool', icon: amenityIcons['Pool'] }
      ]
    },
    {
      id: 19,
      images: [house7, house11, house1],
      type: 'Luxury Studio',
      location: 'Wuse 2, Abuja',
      posted: 'Posted 1 week ago',
      amount: 45000,
      rating: 5.7,
      isNew: false,
      description: 'High-end studio apartment with modern design and premium amenities in central location.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Gym', icon: amenityIcons['Gym'] },
        { name: 'Pool', icon: amenityIcons['Pool'] }
      ]
    },
    {
      id: 20,
      images: [house10, house15, house3],
      type: '5 Bedroom Duplex',
      location: 'Jahi, Abuja',
      posted: 'Posted 2 weeks ago',
      amount: 110000,
      rating: 6.0,
      isNew: true,
      description: 'Magnificent 5-bedroom duplex with exceptional space and luxury finishes throughout.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Pool', icon: amenityIcons['Pool'] },
        { name: 'Garden', icon: amenityIcons['Garden'] },
        { name: 'Staff Quarters', icon: amenityIcons['Staff Quarters'] }
      ]
    },
    {
      id: 21,
      images: [house6, house13, house4],
      type: '3 Bedroom Apartment',
      location: 'Garki, Abuja',
      posted: 'Posted 1 month ago',
      amount: 52000,
      rating: 4.8,
      isNew: true,
      description: 'Modern 3-bedroom apartment with contemporary design and excellent amenities.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Balcony', icon: amenityIcons['Balcony'] }
      ]
    },
    {
      id: 22,
      images: [house8, house12, house7],
      type: '2 Bedroom Duplex',
      location: 'Kubwa, Abuja',
      posted: 'Posted 3 weeks ago',
      amount: 38000,
      rating: 4.5,
      isNew: false,
      description: 'Affordable 2-bedroom duplex offering great value and comfortable living space.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Small Garden', icon: amenityIcons['Small Garden'] }
      ]
    },
    {
      id: 23,
      images: [house1, house14, house9],
      type: 'Executive Studio',
      location: 'Central Area, Abuja',
      posted: 'Posted 1 week ago',
      amount: 35000,
      rating: 4.6,
      isNew: true,
      description: 'Executive studio apartment in prime central location. Perfect for professionals.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Work Area', icon: amenityIcons['Work Area'] }
      ]
    },
    {
      id: 24,
      images: [house5, house11, house2],
      type: '4 Bedroom Bungalow',
      location: 'Lugbe, Abuja',
      posted: 'Posted 2 weeks ago',
      amount: 65000,
      rating: 4.7,
      isNew: false,
      description: 'Large 4-bedroom bungalow with spacious compound and family-friendly amenities.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Large Garden', icon: amenityIcons['Large Garden'] },
        { name: 'Playground', icon: amenityIcons['Playground'] }
      ]
    },
    {
      id: 25,
      images: [house15, house3, house10],
      type: '1 Bedroom Apartment',
      location: 'Wuse, Abuja',
      posted: 'Posted 1 month ago',
      amount: 28000,
      rating: 4.3,
      isNew: true,
      description: 'Compact 1-bedroom apartment perfect for singles. Modern amenities in convenient location.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] }
      ]
    },
    {
      id: 26,
      images: [house6, house8, house13],
      type: '3 Bedroom Duplex',
      location: 'Maitama, Abuja',
      posted: 'Posted 2 months ago',
      amount: 85000,
      rating: 4.9,
      isNew: false,
      description: 'Premium 3-bedroom duplex in exclusive Maitama with luxury finishes and amenities.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Parking', icon: amenityIcons['Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Pool', icon: amenityIcons['Pool'] },
        { name: 'Garden', icon: amenityIcons['Garden'] },
        { name: 'Concierge', icon: amenityIcons['Concierge'] }
      ]
    },
    {
      id: 27,
      images: [house4, house7, house12],
      type: 'Penthouse Suite',
      location: 'Asokoro, Abuja',
      posted: 'Posted 1 week ago',
      amount: 150000,
      rating: 5.0,
      isNew: true,
      description: 'Luxurious penthouse suite with panoramic city views. The ultimate in luxury living.',
      amenities: [
        { name: 'WiFi', icon: amenityIcons['WiFi'] },
        { name: 'Air Conditioning', icon: amenityIcons['Air Conditioning'] },
        { name: 'Private Parking', icon: amenityIcons['Private Parking'] },
        { name: 'Security', icon: amenityIcons['Security'] },
        { name: 'Private Pool', icon: amenityIcons['Private Pool'] },
        { name: 'Terrace', icon: amenityIcons['Terrace'] },
        { name: 'Butler Service', icon: amenityIcons['Butler Service'] }
      ]
    }
  ]);

  // Liked properties state
  const [likedProperties, setLikedProperties] = useState(new Set());

  // Function to get property by ID from all sources
  const getPropertyById = (id) => {
    const numericId = parseInt(id);

    // Search in categorized properties
    for (const category of Object.values(allProperties)) {
      const property = category.find(p => p.id === numericId);
      if (property) return property;
    }

    // Search in explore properties
    const exploreProperty = exploreProperties.find(p => p.id === numericId);
    if (exploreProperty) return exploreProperty;

    return null;
  };

  // Function to toggle like status — stable reference via useCallback
  const toggleLike = useCallback((propertyId) => {
    setLikedProperties(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(propertyId)) {
        newLiked.delete(propertyId);
      } else {
        newLiked.add(propertyId);
      }
      return newLiked;
    });
  }, []);

  // Function to check if property is liked — stable reference via useCallback
  const isPropertyLiked = useCallback((propertyId) => {
    return likedProperties.has(propertyId);
  }, [likedProperties]);

  const value = useMemo(() => ({
    allProperties,
    exploreProperties,
    likedProperties,
    amenityIcons,
    getPropertyById,
    toggleLike,
    isPropertyLiked
  }), [allProperties, exploreProperties, likedProperties, toggleLike, isPropertyLiked]);

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};