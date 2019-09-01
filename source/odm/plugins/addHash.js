// Core
import v4 from 'uuid/v4';

export const addHash = (schema, options = {}) => {
    const { index } = options;

    schema.add({
        hash: {
            type:   String,
            unique: true,
        },
    });

    schema.pre('save', function (next) {
        this.hash = v4();

        next();
    });

    if (index) {
        schema.path('hash').index(true);
    }
};
