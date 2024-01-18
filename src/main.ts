import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);
    await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
    const builder = new DocumentBuilder();
    const config = builder.setTitle('JGB 3.0 API Documents').setDescription('This is a basic Swagger document.').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}

bootstrap();
