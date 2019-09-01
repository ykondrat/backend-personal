export const order = {
    type:       'object',
    properties: {
        uid: {
            type: 'string',
        },
        pid: {
            type: 'string',
        },
        count: {
            type:    'integer',
            minimum: 1,
        },
        comment: {
            type:      'string',
            maxLength: 250,
        },
    },
    required:             [ 'uid', 'pid', 'count' ],
    additionalProperties: false,
};
