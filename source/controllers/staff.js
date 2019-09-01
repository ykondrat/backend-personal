import { StaffModel } from '../models';

export class StaffController {
    constructor (data) {
        this.models = {
            staff: new StaffModel(data),
        };
    }

    async login () {
        const data = await this.models.staff.login();

        return data;
    }

    async create () {
        const data = await this.models.staff.create();

        return data;
    }

    async getAll () {
        const data = await this.models.staff.getAll();

        return data;
    }
}
