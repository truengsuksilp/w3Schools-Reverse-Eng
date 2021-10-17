/* === External Module === */
const mongoose = require('mongoose');

/* === Define Schema === */
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'email needed'],
            min: [3, 'email must be at least 3 characters LOL']
        },
        password: {
            type: String,
            required: [true, 'password needed'],
            min: [1, 'password must be at least 1 character LOL'],
        },
    },
    {
        timestamps: true,
    }
)

/* === Generate Model === */
const User = mongoose.model('User', UserSchema);

/* === Exports Model === */
module.exports = User;