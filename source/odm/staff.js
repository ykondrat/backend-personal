// Core
import mongoose from 'mongoose';

// Base model
import { users } from './base';

const staff = users.discriminator(
    'staff',
    new mongoose.Schema({
        role: {
            type: String,
        },
        disabled: {
            type: Boolean,
        },
    }, { discriminatorKey: 'model' }),
);

export { staff };
