export class Transaction {
    code: number;
    account_Code: number;
    transaction_Date: Date;
    capture_Date: Date;
    amount: number;
    description: string;

    constructor() {
        this.code = 0;
        this.account_Code = 0;
        this.transaction_Date = new Date();
        this.capture_Date = new Date();
        this.amount = 0;
        this.description = "";
    }
}
