import { RequestService } from './request.service';
import { ServiceEndpoints } from '../../../modals/endpoints/service-endpoints.model';
import { IService } from './interface.service';

export class BaseService<T> implements IService<T> {

    public request: RequestService;
    public endpoints: ServiceEndpoints;
    public dataSerializer: Function;

    constructor(
        private rq: RequestService,
        private serviceEndpoints?: ServiceEndpoints,
        private serializer?: Function
    ) {
        this.endpoints = serviceEndpoints;
        this.request = rq;
        this.dataSerializer = serializer;
    }

    public get(id: number): Promise<T> {
        return this.request.get(this.endpoints.get + '/' + id);
    }

    public create(model: T): Promise<any> {
        return this.request.post(this.endpoints.create, model);
    }

    public update(model: T): Promise<any> {
        return this.request.patch(this.endpoints.create, model);
    }

    public delete(id: number): Promise<any> {
        return this.request.delete(this.endpoints.delete + '/' + id);
    }
}
