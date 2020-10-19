

    export interface Dates {
        valueDate: any;
    }

    export interface AmountCurrency {
        amount: any;
        currencyCode: string;
    }

    export interface Transaction {
        amountCurrency: AmountCurrency;
        type: string;
        creditDebitIndicator: string;
    }

    export interface Merchant {
        name: string;
        accountNumber: string;
    }

    export interface Datum {
        categoryCode: string;
        dates: Dates;
        transaction: Transaction;
        merchant: Merchant;
    }

    export interface RootObject {
        data: Datum[];
    }

    export interface TranscationData {
        date: any;
        merchantName: string;
        amount: any;
    }

