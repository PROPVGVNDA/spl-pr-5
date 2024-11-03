// 1

type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
};

type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyPeriod: number;
    brand: string;
};
  
type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
};
  
type Book = BaseProduct & {
    category: 'books';
    author: string;
    pages: number;
};
  
// 2

// Пошук продуктів за ID в переданому списку товарів
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    if (!Array.isArray(products)) {
      throw new Error('Invalid products array');
    }
    if (typeof id !== 'number') {
      throw new Error('Invalid product ID');
    }

    return products.find(product => product.id === id);
};

// Повертає список товарів, ціна яких менша за maxPrice
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    if (!Array.isArray(products)) {
      throw new Error('Invalid products array');
    }
    if (typeof maxPrice !== 'number' || maxPrice < 0) {
      throw new Error('Invalid max price');
    }

    return products.filter(product => product.price <= maxPrice);
};

// 3

type CartItem<T extends BaseProduct> = {
    product: T;
    quantity: number;
};

// Додає один або більше товарів до кошику
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
  ): CartItem<T>[] => {
    if (!Array.isArray(cart)) {
      throw new Error('Invalid cart');
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
      throw new Error('Invalid quantity');
    }

    const index = cart.findIndex(item => item.product.id === product.id);
    if (index >= 0) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    return cart;
};

// Розраховує загальну вартість усіх товарів у кошику
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    if (!Array.isArray(cart)) {
      throw new Error('Invalid cart');
    }
    return cart.reduce((total, item) => {
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for product ID ${item.product.id}`);
      }

      return total + item.product.price * item.quantity;
    }, 0);
};

// 4

const electronics: Electronics[] = [
    {
      id: 1,
      name: "Телефон",
      price: 10000,
      category: 'electronics',
      warrantyPeriod: 24,
      brand: "Apple",
      description: "Сучасний смартфон"
    },
    {
      id: 2,
      name: "Ноутбук",
      price: 20000,
      category: 'electronics',
      warrantyPeriod: 24,
      brand: "Lenovo",
      description: "Ноутбук для навчання"
    },
    {
        id: 3,
        name: "Пилесос",
        price: 15000,
        category: 'electronics',
        warrantyPeriod: 36,
        brand: "Samsung",
        description: "Пилесос для прибирання у квартирі з можливістю вологого прибирання"
    },
    {
        id: 4,
        name: "Телевізор",
        price: 45000,
        category: 'electronics',
        warrantyPeriod: 60,
        brand: "Philips",
        description: "Телевізор з підтримкою 4K"
    }
];

const clothing: Clothing[] = [
    {
      id: 5,
      name: "Футболка",
      price: 500,
      category: 'clothing',
      size: 'M',
      material: 'Бавовна',
      description: "Комфортна сорочка"
    },
    {
      id: 6,
      name: "Джинси",
      price: 1500,
      category: 'clothing',
      size: 'L',
      material: 'Шовк',
      description: "Шовкові бегі джинси"
    }
];
  
const books: Book[] = [
    {
      id: 7,
      name: "Кобзар",
      price: 800,
      category: 'books',
      author: "Тарас Шевченко",
      pages: 420,
      description: "Книга-збірка творів Тараса Шевченка"
    },
    {
      id: 8,
      name: "Чорна Рада",
      price: 600,
      category: 'books',
      author: "Пантелеймон Куліш",
      pages: 260,
      description: "Перший україномовний історичний роман"
    }
];

const vacuumCleaner = findProduct(electronics, 3);
console.log('Знайдено:', vacuumCleaner);

const jeans = findProduct(clothing, 6);
console.log('Знайдено:', jeans);

const kobzarBook = findProduct(books, 7);
console.log('Знайдено:', kobzarBook);

const affordableElectronics = filterByPrice(electronics, 35000);
console.log('Електроніка до 35000:', affordableElectronics);

const affordableClothing = filterByPrice(clothing, 1000);
console.log('Одежа до 1000:', affordableClothing);

let cart: CartItem<BaseProduct>[] = [];

if (vacuumCleaner) {
  cart = addToCart(cart, vacuumCleaner, 1);
}

if (jeans) {
  cart = addToCart(cart, jeans, 2);
}

if (kobzarBook) {
  cart = addToCart(cart, kobzarBook, 3);
}

console.log('Товари у кошику:', cart);

const totalPrice = calculateTotal(cart);
console.log('Загальна вартість:', totalPrice);
