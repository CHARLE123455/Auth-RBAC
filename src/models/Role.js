const mongoose = require('mongoose');
const Permission = require('./Permission');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
        required: true
    }],
    description: { 
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;