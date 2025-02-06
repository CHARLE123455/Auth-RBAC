const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    actions: {
        type: [{
            type: String,
            enum: {
                values: ['create', 'update', 'delete', 'read', 'assign'],
            }
        }],
        required: [true, 'At least one action is required'],
    },
   
}, {
    timestamps: true
});

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;