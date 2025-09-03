const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedCompanies } = require('../utils/seedCompanies');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
    });
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