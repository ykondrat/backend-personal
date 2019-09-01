// Instruments
import { orders, customers, products } from '../odm';
import { NotFoundError } from '../helpers';

export class OrdersModel {
    constructor (data) {
        this.data = data;
    }

    async create () {
        const { uid, pid, count } = this.data;
        const [ customer, product ] = Promise.all([
            customers.findOne({ _id: uid }),
            products.findOne({ _id: pid }),
        ]);

        if (!customer) {
            throw new NotFoundError('Customers not found');
        }
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        if (product.total < count) {
            throw new Error('Not enough product in warehouse');
        }
        product.total -= count;
        products.findOneAndUpdate({ _id: pid }, product);

        const data = await orders.create(this.data);

        return data;
    }

    async getAll () {
        const { page, size } = this.data;
        const total = await orders.countDocuments();
        const data = await orders
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
        const data = await orders
            .findOne({ hash })
            .lean();

        if (!data) {
            throw new NotFoundError(`Orders document with hash ${hash} not found`);
        }

        return data;
    }

    async updateByHash () {
        const { hash, payload } = this.data;
        const data = await orders.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`Orders document with hash ${hash} not found`);
        }

        return data;
    }

    async removeByHash () {
        const { hash } = this.data;
        const data = await orders.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`Orders document with hash ${hash} not found`);
        }

        return data;
    }
}
