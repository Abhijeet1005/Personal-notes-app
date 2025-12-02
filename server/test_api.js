const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testBackend() {
    try {
        console.log('1. Testing Registration...');
        const email = `test${Date.now()}@example.com`;
        const registerRes = await axios.post(`${API_URL}/auth/register`, {
            username: `user${Date.now()}`,
            email: email,
            password: 'password123'
        });
        const token = registerRes.data.token;
        console.log('   ✅ Registration Successful. Token received.');

        console.log('2. Testing Get User...');
        const userRes = await axios.get(`${API_URL}/auth/me`, {
            headers: { 'x-auth-token': token }
        });
        console.log(`   ✅ User Fetched: ${userRes.data.email}`);

        console.log('3. Testing Create Task...');
        const taskRes = await axios.post(`${API_URL}/tasks`, {
            title: 'Test Task from Script',
            date: new Date()
        }, {
            headers: { 'x-auth-token': token }
        });
        console.log(`   ✅ Task Created: ${taskRes.data.title}`);

        console.log('4. Testing Get Tasks...');
        const tasksRes = await axios.get(`${API_URL}/tasks`, {
            headers: { 'x-auth-token': token }
        });
        console.log(`   ✅ Tasks Fetched: ${tasksRes.data.length} task(s) found.`);

        console.log('\n🎉 BACKEND VERIFICATION COMPLETE: ALL TESTS PASSED');
    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.response ? error.response.data : error.message);
    }
}

testBackend();
