import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
        origin: configService.get<string>('cryptovadyaUiUrl'),
        credentials: true,
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    const appPort = configService.get<string>('port');
    await app.listen(appPort);
}
bootstrap();
