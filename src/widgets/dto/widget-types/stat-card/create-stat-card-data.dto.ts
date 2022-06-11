import { IsString } from 'class-validator';
export class CreateStatCardDataDto {
    @IsString()
    baseCurrencyId: string;

    @IsString()
    baseCurrency: string;

    @IsString()
    quoteCurrency: string;

    constructor(data: CreateStatCardDataDto) {
        this.baseCurrencyId = data.baseCurrencyId;
        this.baseCurrency = data.baseCurrency;
        this.quoteCurrency = data.quoteCurrency;
    }
}
