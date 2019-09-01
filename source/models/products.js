// Instruments
import { products } from '../odm';
import { NotFoundError } from '../helpers';

export class ProductsModel {
    constructor (data) {
        this.data = data;
    }

    async create () {
        const data = await products.create(this.data);

        return data;
    }

    async getAll () {
        const { page, size } = this.data;
        const total = await products.countDocuments();
        const data = await products
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
        const data = await products
            .findOne({ hash })
            .lean();

        if (!data) {
            throw new NotFoundError(`Products document with hash ${hash} not found`);
        }

        return data;
    }

    async updateByHash () {
        const { hash, payload } = this.data;
        const data = await products.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Products document with hash ${hash} not found`);
        }

        return data;
    }

    async removeByHash () {
        const { hash } = this.data;
        const data = await products.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Products document with hash ${hash} not found`);
        }

        return data;
    }
}
