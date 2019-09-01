// Core
import bcrypt from 'bcrypt';

// Instruments
import { staff } from '../odm';

export class StaffModel {
    constructor (data) {
        this.data = data;
    }

    async login () {
        const { email, password } = this.data;
        const { hash, password: userPassword } = await staff
            .findOne({ email })
            .select('password hash')
            .lean();

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return hash;
    }

    async create () {
        const data = await staff.create(this.data);

        return data;
    }

    async getAll () {
        const { page, size } = this.data;
        const total = await staff.countDocuments();
        const data = await staff
            .find({})
            .skip(size * page)
            .limit(size)
            .lean();

        return {
            data,
            meta: {
                total,
                page,
                size,
            },
        };
    }
}
