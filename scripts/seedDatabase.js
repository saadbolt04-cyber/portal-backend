import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedCompanies } from '../utils/seedCompanies.js';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    console.log('📍 Using MongoDB URI:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Seed companies
    await seedCompanies();

    console.log('\n🎉 Database seeded successfully!');
    console.log('🔌 Closing database connection...');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your internet connection');
    console.log('2. Verify MONGODB_URI in .env file');
    console.log('3. Ensure MongoDB Atlas cluster is running');
    console.log('4. Check if IP address is whitelisted in Atlas');
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();