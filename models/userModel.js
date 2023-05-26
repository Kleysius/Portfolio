const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
            }
        }
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;