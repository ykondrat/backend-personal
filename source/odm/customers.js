// Core
import mongoose from 'mongoose';

// Base model
import { users } from './base';

const schema = new mongoose.Schema({
    city: {
        type: String,
    },
    country: {
        type: String,
    },
}, { discriminatorKey: 'model' });

schema.index({ city: 'text' }, { name: 'city' });
schema.index({ notes: 'text' }, { country: 'country' });

const customers = users.discriminator('customers', schema);

customers.createIndexes();

export { customers };
