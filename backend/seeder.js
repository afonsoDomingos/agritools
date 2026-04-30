const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const Specialty = require('./src/models/Specialty');
const User = require('./src/models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: 'Pulverizador Solar 20L',
    images: ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800'],
    description: 'Pulverizador de mochila com carregamento solar, capacidade de 20 litros. Ideal para grandes áreas sem necessidade de bombeamento manual.',
    category: 'Máquinas',
    price: 6000,
    stock: 25,
    rating: 4.9,
    numReviews: 10,
  },
  {
    name: 'Termómetro Digital Agrícola',
    images: ['https://images.unsplash.com/photo-1517404212733-149d682498be?auto=format&fit=crop&q=80&w=800'],
    description: 'Termómetro de precisão para medição de temperatura do solo e do ar. Essencial para monitorar o desenvolvimento das culturas.',
    category: 'Ferramentas',
    price: 600,
    stock: 100,
    rating: 4.5,
    numReviews: 5,
  },
  {
    name: 'Atomizador 14L Profissional',
    images: ['https://images.unsplash.com/photo-1590684183327-02456f176764?auto=format&fit=crop&q=80&w=800'],
    description: 'Atomizador a gasolina com 14 litros de capacidade. Alta potência para dispersão de defensivos em árvores de grande porte.',
    category: 'Máquinas',
    price: 13000,
    stock: 15,
    rating: 4.8,
    numReviews: 7,
  },
  {
    name: 'Tabuleiro de Isopor para Mudas',
    images: ['https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=800'],
    description: 'Tabuleiro de poliestireno (isopor) de alta densidade para germinação de mudas. Durável e térmico.',
    category: 'Sementes',
    price: 350,
    stock: 500,
    rating: 4.3,
    numReviews: 25,
  },
  {
    name: 'Aspersor Suspenso para Irrigação',
    images: ['https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800'],
    description: 'Aspersor suspenso tipo bailarina, ideal para estufas e viveiros. Cobertura uniforme de 360 graus.',
    category: 'Ferramentas',
    price: 500,
    stock: 200,
    rating: 4.6,
    numReviews: 12,
  },
  {
    name: 'Sementes de Milho Híbrido',
    images: ['https://images.unsplash.com/photo-1551373884-8a0750074df7?auto=format&fit=crop&q=80&w=800'],
    description: 'Sementes de milho de alta produtividade adaptadas ao clima local.',
    category: 'Sementes',
    price: 1200,
    stock: 500,
    rating: 4.5,
    numReviews: 12,
  }
];

const specialties = [
  { name: 'Sementes & Fertilizantes', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800', path: '/shop?category=seeds' },
  { name: 'Equipamentos Avícolas', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800', path: '/shop?category=poultry' },
  { name: 'Consultoria Técnica', image: 'https://images.unsplash.com/photo-1590684183327-02456f176764?auto=format&fit=crop&q=80&w=800', path: '/shop?category=consultancy' },
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Specialty.deleteMany();
    await User.deleteMany();

    await Product.insertMany(products);
    await Specialty.insertMany(specialties);

    await User.create({
      name: 'Admin AgriTools',
      email: 'admin@agritools.co.mz',
      password: '@Admin123@',
      role: 'admin'
    });

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedData();
