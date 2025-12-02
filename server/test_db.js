const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('Testing MongoDB Connection...');
console.log('URI:', process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection Failed:');
        console.error(err.message);
        console.error('Full Error:', err);
        process.exit(1);
    });
