import { IsString } from 'class-validator';
export class StatCardData {
    @IsString()
    baseCurrency: string;

    @IsString()
    quoteCurrency: string;

    constructor(data: StatCardData) {
        this.baseCurrency = data.baseCurrency;
        this.quoteCurrency = data.quoteCurrency;
    }
}
