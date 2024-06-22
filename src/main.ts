import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PMS API')
    .setDescription('The PMS API description')
    .setVersion('1.0')
    .addTag('pms')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.use(csurf());

  app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: true });
    next();
  });

  await app.listen(3000);
}
bootstrap();
