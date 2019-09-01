// Core
import mongoose from 'mongoose';

// Plugins
import { addHash } from './plugins';

const schema = new mongoose.Schema(
    {
        title: {
            type:      String,
            required:  true,
            maxlength: 30,
        },
        description: {
            type:      String,
            required:  true,
            maxlength: 250,
        },
        price: {
            type:     Number,
            required: true,
            min:      1,
        },
        discount: {
            type:     Number,
            required: true,
            min:      0,
            max:      50,
        },
        total: {
            type: Number,
            min:  0,
            max:  100,
        },
    },
    {
        timestamp: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index({
    title:       'text',
    description: 'text',
}, {
    name: 'titleDescription',
});
schema.plugin(addHash, { index: true });

const products = mongoose.model('products', schema);

products.createIndexes();

export { products };
