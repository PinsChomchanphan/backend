export class RequestSettings {

    public withCredentials: boolean;

    public serializer: Function;

    public isCustomErrorHandle: boolean;

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.withCredentials = data.withCredentials ? true : false;
        this.isCustomErrorHandle = data.isCustomErrorHandle ? true : false;
        this.serializer = data.serializer;
    }
}
