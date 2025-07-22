import { ProductType } from '@/app/product/[id]/page';

export const sampleProducts: ProductType[] = [
  {
    _id: '1',
    name: 'Premium Wireless Headphones',
    description:
      'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort padding.',
    price: 299.99,
    originalPrice: 399.99,
    images: ['/default.webp', '/banner.webp', '/signup.webp'],
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium comfort padding',
      'Bluetooth 5.0 connectivity',
      'Quick charge - 5 min for 2 hours',
      'Voice assistant compatible',
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      Impedance: '32 Ohm',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      Weight: '250g',
      Connectivity: 'Bluetooth 5.0, 3.5mm jack',
      Warranty: '2 years',
    },
    tags: ['wireless', 'noise-cancelling', 'premium', 'bluetooth'],
  },
  {
    _id: '2',
    name: 'Smart Fitness Watch',
    description:
      'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS tracking, and 7-day battery life.',
    price: 199.99,
    originalPrice: 249.99,
    images: ['/default.webp', '/banner.webp'],
    category: 'Wearables',
    brand: 'FitTech',
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    features: [
      'Heart rate monitoring',
      'GPS tracking',
      '7-day battery life',
      'Water resistant (50m)',
      'Sleep tracking',
      'Multiple sport modes',
    ],
    specifications: {
      Display: '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      Sensors: 'Heart rate, GPS, Accelerometer',
      Compatibility: 'iOS & Android',
      Weight: '45g',
      'Strap Material': 'Silicone',
      Warranty: '1 year',
    },
    tags: ['fitness', 'smartwatch', 'gps', 'health'],
  },
  {
    _id: '3',
    name: 'Professional Camera Lens',
    description:
      'Capture stunning photos with this professional-grade camera lens featuring ultra-sharp optics and weather sealing.',
    price: 899.99,
    images: ['/default.webp'],
    category: 'Photography',
    brand: 'LensMaster',
    rating: 4.9,
    reviewCount: 324,
    inStock: false,
    features: [
      'Ultra-sharp optics',
      'Weather sealed construction',
      'Fast autofocus',
      'Image stabilization',
      'Professional build quality',
    ],
    specifications: {
      'Focal Length': '24-70mm',
      Aperture: 'f/2.8',
      Mount: 'Canon EF',
      Weight: '805g',
      'Filter Size': '82mm',
      'Min Focus Distance': '0.38m',
      'Weather Sealing': 'Yes',
      Warranty: '3 years',
    },
    tags: ['photography', 'professional', 'lens', 'canon'],
  },
  {
    _id: '4',
    name: 'Ergonomic Office Chair',
    description:
      'Work comfortably all day with this ergonomic office chair featuring lumbar support, adjustable height, and premium materials.',
    price: 449.99,
    originalPrice: 599.99,
    images: ['/default.webp', '/banner.webp'],
    category: 'Furniture',
    brand: 'ComfortPro',
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    features: [
      'Lumbar support',
      'Adjustable height',
      'Premium materials',
      '360-degree swivel',
      'Breathable mesh back',
      'Weight capacity: 300lbs',
    ],
    specifications: {
      'Seat Height': '17-21 inches',
      'Seat Width': '20 inches',
      'Seat Depth': '20 inches',
      'Back Height': '26 inches',
      'Weight Capacity': '300 lbs',
      Material: 'Mesh and fabric',
      Base: '5-star nylon base',
      Warranty: '5 years',
    },
    tags: ['office', 'ergonomic', 'chair', 'furniture'],
  },
];

// Mock API function for demonstration
export const getMockProduct = (id: string): ProductType | undefined => {
  return sampleProducts.find((product) => product._id === id);
};

export const getMockProducts = (): ProductType[] => {
  return sampleProducts;
};
