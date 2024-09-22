import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('Vendas API')
  .setDescription('API para gerenciamento de produtos e de vendas.')
  .setVersion('1.0')
  .addTag('vendas')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors( { origin: 'http://localhost:5173' } );

  await app.listen(3000);
}
bootstrap();
