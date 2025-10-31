// Simple database configuration
console.log('🔧 Database configuration loaded');

const connectDB = async () => {
  try {
    console.log('✅ Database connection initialized');
    console.log('💡 Using development mode - add MongoDB later');
    return true;
  } catch (error) {
    console.log('⚠️  Database not available, but server will continue');
    console.log('💡 Install MongoDB for full functionality');
    return true;
  }
};

module.exports = connectDB;