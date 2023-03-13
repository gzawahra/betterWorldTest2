import { NestFactory } from '@nestjs/core';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  // const openAPI: OpenAPIObject = JSON.parse(
  //   readFileSync('./swagger/swagger.json', 'utf8'),
  // );
  // SwaggerModule.setup('api', app, openAPI, {
  //   customCss: readFileSync('./swagger/SwaggerDark.css', 'utf-8'),
  // });

  app.enableCors({
    origin: configService.get('FRONT_URL'),
    credentials: true,
  });

  await app.listen(3300);
}
bootstrap();
