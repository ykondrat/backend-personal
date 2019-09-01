// Instruments
import { customers } from '../odm';
import { NotFoundError } from '../helpers';

export class CustomersModel {
    constructor (data) {
        this.data = data;
    }

    async create () {
        const data = await customers.create(this.data);

        return data;
    }

    async getAll () {
        const { page, size } = this.data;
        const total = await customers.countDocuments();
        const data = await customers
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

    async getByHash () {
        const { hash } = this.data;
        const data = await customers
            .findOne({ hash })
            .lean();

        if (!data) {
            throw new NotFoundError(`Customers document with hash ${hash} not found`);
        }

        return data;
    }

    async updateByHash () {
        const { hash, payload } = this.data;
        const data = await customers.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Customers document with hash ${hash} not found`);
        }

        return data;
    }

    async removeByHash () {
        const { hash } = this.data;
        const data = await customers.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Customers document with hash ${hash} not found`);
        }

        return data;
    }
}
