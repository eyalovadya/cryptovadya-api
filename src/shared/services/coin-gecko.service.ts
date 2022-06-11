import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SimplePriceResponse } from '../types/simple-price-response.type';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CoinGeckoService {
    private baseUrl = 'https://api.coingecko.com/api/v3';

    constructor(private httpService: HttpService) {}

    async simplePrice(baseCurrenciesIds: string[], quoteCurrencies: string[]): Promise<SimplePriceResponse> {
        const ids = baseCurrenciesIds.join(',').toLowerCase();
        const vsCurrencies = quoteCurrencies.join(',').toLowerCase();
        const requestUrl = `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}&include_24hr_change=true`;
        const observable = this.httpService.get<SimplePriceResponse>(requestUrl);
        const response = await firstValueFrom(observable);
        return response.data;
    }
}
