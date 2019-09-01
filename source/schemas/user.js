export const user = {
    type:       'object',
    properties: {
        name: {
            type:       'object',
            properties: {
                first: {
                    type:      'string',
                    minLength: 2,
                    maxLength: 15,
                },
                name: {
                    type:      'string',
                    minLength: 2,
                    maxLength: 15,
                },
            },
        },
        emails: {
            type:  'array',
            items: {
                type:       'object',
                properties: {
                    email: {
                        type:   'string',
                        format: 'email',
                    },
                    primary: {
                        type: 'boolean',
                    },
                },
            },
        },
        phones: {
            type:  'array',
            items: {
                type:       'object',
                properties: {
                    phone: {
                        type: 'string',
                    },
                    primary: {
                        type: 'boolean',
                    },
                },
            },
        },
        password: {
            type:      'string',
            minLength: 3,
        },
    },
    required:             [ 'name', 'emails', 'phones', 'password' ],
    additionalProperties: true,
};
