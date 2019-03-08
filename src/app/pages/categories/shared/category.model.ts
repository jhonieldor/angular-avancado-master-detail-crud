import { BaseResourceModel } from '../../../shared/models/base-resources.model';

export class Category extends BaseResourceModel{
    constructor(
        public id?: number,
        public name?: string,
        public description?: string
    ) {
        super()
    }

    static fromJson(jsonData: any): Category {
        console.log('Category.fromJson(json)')
        console.log('jsonData=', jsonData)
        return Object.assign(new Category(), jsonData)
    }

}