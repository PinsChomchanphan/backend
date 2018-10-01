export class SubscribeModel {
    public id: string;
    public callback: Function;
    public unsubscribe: Function;

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    private cast(data) {
        this.id = data.id;
        this.callback = data.callback;
        this.unsubscribe = data.unsubscribe;
    }
}
