const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: isMailValid => `${isMailValid.value} is not a valid email address!`
        },
        
    },
    password:{
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}/.test(password);
            },
            message: isPasswordValid => `${isPasswordValid.value} is not a valid password!`
        },
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'shipper', 'carrier'],
        default: 'admin',
    },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }, 
    { 
        timestamps: true 
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;