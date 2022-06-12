import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoinGeckoService } from './services/coin-gecko.service';

@Global()
@Module({
    imports: [HttpModule],
    providers: [CoinGeckoService, HttpModule],
    exports: [CoinGeckoService, HttpModule],
})
export class SharedModule {}
