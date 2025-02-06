const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
        required: true
    }],
    description: { 
        type: String,
        required: [true, 'Role description is required'],
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    level: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

RoleSchema.pre('find', function() {
    this.populate('permissions');
});

RoleSchema.pre('findOne', function() {
    this.populate('permissions');
});


RoleSchema.methods.hasPermission = function(action) {
    return this.permissions.some(permission => 
        permission.actions.includes(action) && permission.isActive
    );
};


RoleSchema.methods.addPermissions = async function(permissionIds) {
    this.permissions = [...new Set([...this.permissions, ...permissionIds])];
    return await this.save();
};

RoleSchema.methods.removePermissions = async function(permissionIds) {
    this.permissions = this.permissions.filter(
        id => !permissionIds.includes(id.toString())
    );
    return await this.save();
};


RoleSchema.statics.getDefaultRole = function() {
    return this.findOne({ isDefault: true });
};

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
