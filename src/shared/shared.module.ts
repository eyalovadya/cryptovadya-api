import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from './config/config.service';
import { CoinGeckoService } from './services/coin-gecko.service';

@Global()
@Module({
    imports: [ConfigService, CoinGeckoService, HttpModule],
    providers: [ConfigService, CoinGeckoService, HttpModule],
    exports: [ConfigService, CoinGeckoService, HttpModule],
})
export class SharedModule {}
