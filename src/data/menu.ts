export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "todos", name: "Todos", icon: "Home" },
  { id: "cafe", name: "Café", icon: "Coffee" },
  { id: "frappes", name: "Frappés", icon: "IceCream" },
  { id: "postres", name: "Postres", icon: "Cake" },
  { id: "bebidas", name: "Bebidas", icon: "CupSoda" },
  { id: "alimentos", name: "Alimentos", icon: "UtensilsCrossed" },
];

export const products: Product[] = [
  // Café
  {
    id: "2",
    name: "Café Latte",
    description: "Espresso suave con leche vaporizada y espuma",
    price: 55,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    category: "cafe",
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "Equilibrio perfecto de café, leche y espuma cremosa",
    price: 55,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
    category: "cafe",
  },
  {
    id: "4",
    name: "Americano",
    description: "Espresso suavizado con agua caliente",
    price: 50,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop",
    category: "cafe",
  },

  // Frappés
  {
    id: "6",
    name: "Frappé de Caramelo",
    description: "Café helado con caramelo y crema batida",
    price: 70,
    image: "https://images.unsplash.com/photo-1562841791-9a0bcbc3c8cd?w=400&h=400&fit=crop",
    category: "frappes",
  },
  {
    id: "7",
    name: "Frappé de Chocolate",
    description: "Bebida helada de chocolate con crema",
    price: 70,
    image: "https://images.unsplash.com/photo-1568901569842-d0164d1eb82f?w=400&h=400&fit=crop",
    category: "frappes",
  },

  // Postres
  {
    id: "10",
    name: "Pastel de Zanahoria",
    description: "Suave bizcocho con especias y crema de queso",
    price: 60,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop",
    category: "postres",
  },
  {
    id: "12",
    name: "Brownie de Chocolate",
    description: "Intenso chocolate con nueces",
    price: 55,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
    category: "postres",
  },
  {
    id: "14",
    name: "Croissant de Almendras",
    description: "Hojaldrado relleno de crema de almendras",
    price: 50,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
    category: "postres",
  },

  // Bebidas
  {
    id: "15",
    name: "Smoothie de Fresa",
    description: "Natural, fresco y cremoso",
    price: 60,
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=400&fit=crop",
    category: "bebidas",
  },
  {
    id: "17",
    name: "Té Chai Helado",
    description: "Especiado y refrescante",
    price: 50,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    category: "bebidas",
  },

  // Alimentos
  {
    id: "19",
    name: "Sándwich Club",
    description: "Pollo, tocino, aguacate y vegetales frescos",
    price: 85,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop",
    category: "alimentos",
  },
  {
    id: "20",
    name: "Panini Caprese",
    description: "Mozzarella, tomate, albahaca y pesto",
    price: 75,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=400&fit=crop",
    category: "alimentos",
  },
  {
    id: "21",
    name: "Ensalada César",
    description: "Lechuga romana, crutones y pollo a la parrilla",
    price: 80,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop",
    category: "alimentos",
  },
];
