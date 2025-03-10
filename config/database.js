require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

if (!process.env.DB_URL) {
   console.error("❌ Error: DB_URL is not defined in .env file.");
   process.exit(1);
}

// Create Sequelize instance using DB_URL
const sequelize = new Sequelize(process.env.DB_URL, {
   dialect: 'postgres', // Render uses PostgreSQL
   dialectOptions: {
      ssl: {
         require: true,
         rejectUnauthorized: false, // Required for Render-hosted Postgres
      },
   },
   logging: false, // Disable logging for cleaner output
});

// Test database connection
sequelize.authenticate()
   .then(() => console.log('✅ PostgreSQL Connected'))
   .catch((err) => console.error('❌ Database connection error:', err));

module.exports = sequelize;
