const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Permission name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Permission description is required'],
        trim: true
    },
    actions: {
        type: [{
            type: String,
            enum: {
                values: [
                    'create_user',
                    'view_users',
                    'view_user',
                    'edit_user',
                    'delete_user',
                    'create_role',
                    'view_roles',
                    'assign_role',
                    'change_password'
                ],
                message: '{VALUE} is not a valid permission action'
            }
        }],
        required: [true, 'At least one action is required'],
        validate: {
            validator: function(actions) {
                return actions.length > 0;
            },
            message: 'At least one action must be specified'
        }
    },
    resource: {
        type: String,
        required: [true, 'Resource name is required'],
        enum: {
            values: ['user', 'role', 'permission', 'auth'],
            message: '{VALUE} is not a valid resource'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


PermissionSchema.index({ name: 1, resource: 1 }, { unique: true });

PermissionSchema.methods.hasAction = function(action) {
    return this.actions.includes(action);
};

PermissionSchema.statics.getResourcePermissions = function(resource) {
    return this.find({ resource, isActive: true });
};

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;