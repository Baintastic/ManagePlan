export class Account {
    code: number;
    person_Code: number;
    account_Number: string;
    outstanding_Balance: number;
    is_Closed: boolean;

    constructor() {
        this.code = 0;
        this.person_Code = 0;
        this.account_Number = "";
        this.outstanding_Balance = 0;
        this.is_Closed = false;
    }
}
