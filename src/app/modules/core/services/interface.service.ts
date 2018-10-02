import { RequestService } from './request.service';

export interface IService<T> {
    request: RequestService;
    get(id: number): Promise<T>;
    create(model: T): Promise<any>;
    update(model: T): Promise<any>;
    delete(id: number): Promise<any>;
}
