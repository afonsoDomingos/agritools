const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const User = require('./src/models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: 'Sementes de Milho Híbrido',
    images: ['https://images.unsplash.com/photo-1551373884-8a0750074df7?auto=format&fit=crop&q=80&w=800'],
    description: 'Sementes de milho de alta produtividade, resistentes a pragas locais e adaptadas ao clima de Moçambique.',
    category: 'Sementes',
    price: 1200,
    stock: 500,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Bebedouro Automático para Frangos',
    images: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800'],
    description: 'Sistema de hidratação automática para avicultura, reduz o desperdício de água e mantém a higiene.',
    category: 'Avicultura',
    price: 450,
    stock: 100,
    rating: 4.8,
    numReviews: 8,
  },
  {
    name: 'Fertilizante NPK 12-24-12',
    images: ['https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=800'],
    description: 'Fertilizante equilibrado para diversas culturas, promovendo crescimento vigoroso e alta produtividade.',
    category: 'Fertilizantes',
    price: 3500,
    stock: 200,
    rating: 4.2,
    numReviews: 15,
  },
  {
    name: 'Kit de Ferramentas Manuais',
    images: ['https://images.unsplash.com/photo-1617333282638-306f1d8f804f?auto=format&fit=crop&q=80&w=800'],
    description: 'Conjunto de enxada, pá e ancinho de aço temperado com cabos ergonómicos.',
    category: 'Ferramentas',
    price: 1800,
    stock: 50,
    rating: 4.7,
    numReviews: 20,
  }
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedData();
