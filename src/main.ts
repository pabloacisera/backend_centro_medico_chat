import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', // Origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir credenciales (cookies, headers de autenticación, etc.)
  };
  app.enableCors(corsOptions);
  const port = process.env.PORT || 8000
  await app.listen(port, '0.0.0.0');
}
bootstrap();
