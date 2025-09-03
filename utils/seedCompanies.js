const mongoose = require('mongoose');
const Company = require('../models/Company');

const companies = [
  {
    name: 'Saudi Aramco',
    domain: 'aramco.com',
    description: 'Saudi Arabian Oil Company',
    industry: 'Oil & Gas',
    country: 'Saudi Arabia'
  },
  {
    name: 'ADNOC',
    domain: 'adnoc.ae',
    description: 'Abu Dhabi National Oil Company',
    industry: 'Oil & Gas',
    country: 'UAE'
  },
  {
    name: 'QTM',
    domain: 'qtm.com.qa',
    description: 'Qatar Terminal Management',
    industry: 'Oil & Gas',
    country: 'Qatar'
  },
  {
    name: 'PDO',
    domain: 'pdo.co.om',
    description: 'Petroleum Development Oman',
    industry: 'Oil & Gas',
    country: 'Oman'
  },
  {
    name: 'DNV',
    domain: 'dnv.com',
    description: 'Det Norske Veritas',
    industry: 'Certification & Testing',
    country: 'Norway'
  },
  {
    name: 'Saher Flow Solutions',
    domain: 'saherflow.com',
    description: 'Flow Measurement Solutions Provider',
    industry: 'Engineering Services',
    country: 'Saudi Arabia'
  }
];

const seedCompanies = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing companies
    const deletedCount = await Company.countDocuments();
    await Company.deleteMany({});
    console.log(`🗑️  Cleared ${deletedCount} existing companies`);
    
    // Insert new companies
    const insertedCompanies = await Company.insertMany(companies);
    
    console.log('✅ Companies seeded successfully');
    console.log(`📊 Added ${insertedCompanies.length} companies to the database:`);
    
    companies.forEach(company => {
      console.log(`   ✓ ${company.name} (${company.domain})`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding companies:', error.message);
    throw error;
  }
};

module.exports = { seedCompanies, companies };