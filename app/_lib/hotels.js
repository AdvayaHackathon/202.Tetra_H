export async function getHotels(lat, lon) {
  try {
    // In a real application, you would use an actual hotel API
    // For now, we'll simulate some hotel data
    const mockHotels = [
      {
        id: 1,
        name: "Grand Hotel",
        lat: lat + 0.001,
        lon: lon + 0.001,
        rating: 4.5,
        price: 200,
      },
      {
        id: 2,
        name: "Seaside Resort",
        lat: lat - 0.002,
        lon: lon + 0.002,
        rating: 4.2,
        price: 180,
      },
      {
        id: 3,
        name: "Mountain View Inn",
        lat: lat + 0.003,
        lon: lon - 0.001,
        rating: 4.0,
        price: 150,
      },
      {
        id: 4,
        name: "City Center Hotel",
        lat: lat - 0.001,
        lon: lon - 0.002,
        rating: 3.8,
        price: 120,
      },
      {
        id: 5,
        name: "Luxury Suites",
        lat: lat + 0.002,
        lon: lon + 0.003,
        rating: 4.7,
        price: 250,
      },
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockHotels;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Failed to fetch hotel data");
  }
} 