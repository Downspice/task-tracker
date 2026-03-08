import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true,
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    const result = errors.map((error) => {
      const message = error.constraints 
        ? Object.values(error.constraints)[0] 
        : `Property ${error.property} is not allowed`;

      return {
        field: error.property,
        message: message,
      };
    });
    return new BadRequestException(result);
  },
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
