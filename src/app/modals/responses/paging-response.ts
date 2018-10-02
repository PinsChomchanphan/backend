import { Meta } from './meta';

export class PagingResponse {

    public data: Array<any>;

    public totalItems: number;

    public pageSize: number;

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.data = data.data;
        this.totalItems = data.totalItems;
        this.pageSize = data.pageSize;
    }
}
