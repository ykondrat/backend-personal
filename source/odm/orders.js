// Core
import mongoose from 'mongoose';

// Instruments
import { customers, products } from './';

const schema = new mongoose.Schema(
    {
        uid: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:  customers,
        },
        pid: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:  products,
        },
        count: {
            type:     String,
            required: true,
            min:      1,
        },
        comment: {
            type:      String,
            required:  true,
            maxlength: 250,
        },
    },
    {
        timestamp: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

const orders = mongoose.model('orders', schema);

export { orders };
