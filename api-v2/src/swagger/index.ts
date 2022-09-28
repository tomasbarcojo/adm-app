import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function createdocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('nestjs-api-template')
    .setDescription('nest js API template.')
    .setVersion('1.0')
    .addTag('nestjs-api-template')
    .addServer(`http://localhost:${process.env.PORT}`, 'Local') // http://localhost:3003/docs
    .addServer(`https://beta.api.chiper.co/api-name`, 'Beta')
    .addServer(`https://staging.api.chiper.co/api-name`, 'Staging')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  return document;
}
