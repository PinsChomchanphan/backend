import { Meta } from './meta';

export interface IResponse {

    data: any;

    errors: Array<string>;

    meta: Meta;
}
