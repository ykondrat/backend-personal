export const product = {
    type:       'object',
    properties: {
        title: {
            type:      'string',
            minLength: 3,
        },
        description: {
            type:      'string',
            minLength: 3,
        },
        price: {
            type:    'integer',
            minimum: 1,
        },
        discount: {
            type:    'integer',
            minimum: 0,
            maximum: 50,
        },
        total: {
            type:    'integer',
            minimum: 0,
            maximum: 100,
        },
    },
    required:             [ 'title', 'description', 'price', 'discount' ],
    additionalProperties: false,
};
