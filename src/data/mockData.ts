
// Types for our data models
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cafe' | 'user';
};

export type Cafe = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  status: 'pending' | 'approved' | 'rejected';
  location: string;
  image: string;
  openingHours: string;
  createdAt: string;
};

export type MenuItem = {
  id: string;
  cafeId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
};

export type OrderItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  userName: string;
  cafeId: string;
  cafeName: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
};

// Mock data
export const mockCafes: Cafe[] = [
  {
    id: '1',
    name: 'The Brew House',
    description: 'Specialty coffee and fresh pastries for the early birds.',
    ownerId: '2',
    status: 'approved',
    location: 'Engineering Building, Ground Floor',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
    openingHours: 'Mon-Fri: 7:00 AM - 6:00 PM',
    createdAt: '2023-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'Campus Bites',
    description: 'Quick and healthy lunches for students on the go.',
    ownerId: '4',
    status: 'approved',
    location: 'Student Union, First Floor',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop',
    openingHours: 'Mon-Fri: 9:00 AM - 8:00 PM, Sat: 10:00 AM - 4:00 PM',
    createdAt: '2023-02-10T10:30:00Z'
  },
  {
    id: '3',
    name: 'Library Lounge',
    description: 'Quiet study space with coffee and snacks.',
    ownerId: '5',
    status: 'pending',
    location: 'Main Library, Second Floor',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    openingHours: 'Mon-Sun: 8:00 AM - 10:00 PM',
    createdAt: '2023-03-05T14:15:00Z'
  },
  {
    id: '4',
    name: 'Science Smoothies',
    description: 'Fresh fruit smoothies and protein shakes for health enthusiasts.',
    ownerId: '6',
    status: 'approved',
    location: 'Science Building, First Floor',
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=2067&auto=format&fit=crop',
    openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    createdAt: '2023-02-20T09:45:00Z'
  }
];

export const mockMenuItems: MenuItem[] = [
  // Brew House Menu
  {
    id: '101',
    cafeId: '1',
    name: 'Espresso',
    description: 'Strong, concentrated coffee brewed by forcing hot water through finely-ground coffee beans.',
    price: 2.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4b5d5e0b35d?q=80&w=2070&auto=format&fit=crop',
    available: true
  },
  {
    id: '102',
    cafeId: '1',
    name: 'Croissant',
    description: 'Buttery, flaky pastry of Austrian origin.',
    price: 3.00,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2126&auto=format&fit=crop',
    available: true
  },
  {
    id: '103',
    cafeId: '1',
    name: 'Latte',
    description: 'Coffee drink made with espresso and steamed milk.',
    price: 4.00,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2037&auto=format&fit=crop',
    available: true
  },
  
  // Campus Bites Menu
  {
    id: '201',
    cafeId: '2',
    name: 'Chicken Wrap',
    description: 'Grilled chicken with fresh veggies in a whole wheat wrap.',
    price: 6.50,
    category: 'Main',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1887&auto=format&fit=crop',
    available: true
  },
  {
    id: '202',
    cafeId: '2',
    name: 'Greek Salad',
    description: 'Fresh salad with tomatoes, cucumbers, olives, and feta cheese.',
    price: 5.50,
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=2074&auto=format&fit=crop',
    available: true
  },
  {
    id: '203',
    cafeId: '2',
    name: 'Veggie Burger',
    description: 'Plant-based patty on a brioche bun with all the fixings.',
    price: 7.00,
    category: 'Main',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2130&auto=format&fit=crop',
    available: true
  },
  
  // Science Smoothies Menu
  {
    id: '401',
    cafeId: '4',
    name: 'Berry Blast Smoothie',
    description: 'Mixed berries, banana, and yogurt blended with ice.',
    price: 5.00,
    category: 'Smoothie',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90bb802?q=80&w=1854&auto=format&fit=crop',
    available: true
  },
  {
    id: '402',
    cafeId: '4',
    name: 'Protein Power Shake',
    description: 'Chocolate protein powder, banana, peanut butter, and almond milk.',
    price: 6.00,
    category: 'Protein Shake',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1898&auto=format&fit=crop',
    available: true
  }
];

export const mockOrders: Order[] = [
  {
    id: '1001',
    userId: '3',
    userName: 'Student User',
    cafeId: '1',
    cafeName: 'The Brew House',
    items: [
      {
        menuItemId: '101',
        name: 'Espresso',
        price: 2.50,
        quantity: 1
      },
      {
        menuItemId: '102',
        name: 'Croissant',
        price: 3.00,
        quantity: 2
      }
    ],
    status: 'completed',
    totalAmount: 8.50,
    createdAt: '2023-04-10T09:15:00Z'
  },
  {
    id: '1002',
    userId: '3',
    userName: 'Student User',
    cafeId: '2',
    cafeName: 'Campus Bites',
    items: [
      {
        menuItemId: '201',
        name: 'Chicken Wrap',
        price: 6.50,
        quantity: 1
      },
      {
        menuItemId: '202',
        name: 'Greek Salad',
        price: 5.50,
        quantity: 1
      }
    ],
    status: 'ready',
    totalAmount: 12.00,
    createdAt: '2023-04-15T12:30:00Z'
  },
  {
    id: '1003',
    userId: '7',
    userName: 'Jane Doe',
    cafeId: '4',
    cafeName: 'Science Smoothies',
    items: [
      {
        menuItemId: '401',
        name: 'Berry Blast Smoothie',
        price: 5.00,
        quantity: 2
      }
    ],
    status: 'pending',
    totalAmount: 10.00,
    createdAt: '2023-04-16T11:00:00Z'
  }
];
