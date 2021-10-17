// Internal Modules
require('../config/db.connection');
const User = require('../models/User');

// Delete Many and Add Users
const users = [
    {
        email: 'blah@blah.com',
        password: 'blah',
    },
    {
        email: 'admin',
        password: 'admin',
    }
]

const reseedUsers = async () => {
    try {
        const deleteUsers = await User.deleteMany({});
        const createUsers = await User.insertMany(users);

        console.log('=== SEEDED USERS ===');
        console.log(createUsers);
        process.exit();

    } catch (error) {
        console.log(error);
    }
}

reseedUsers();