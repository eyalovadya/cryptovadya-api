import { IsNumber, IsString } from 'class-validator';
export class StatCardDataDto {
    @IsString()
    baseCurrencyId: string;

    @IsString()
    baseCurrency: string;

    @IsString()
    quoteCurrency: string;

    @IsNumber()
    data: number;

    @IsNumber()
    dayDiffPrecent: number;
}
