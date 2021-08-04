export class Alert {
    type: AlertType;
    message: string;
    class: string;
    input: string;

    constructor(init?:Partial<Alert>) {
        this.type = AlertType.Info;
        this.message = "";
        this.class = "";
        this.input = "";
    }
}

export enum AlertType {
    Success,
    UpdateSuccess,
    DeleteSuccess,
    LoginSuccess,
    Error,
    Info,
    Warning
}