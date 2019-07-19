import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresaModule } from './empresa/empresa.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('DDsys')
    .setDescription('Swagger module for ddsys API')
    .setVersion('1.0')
    .addTag('ddsys')
    .build();

  const authDocument = SwaggerModule.createDocument(app, options, {
    include: [AuthModule],
  });
  SwaggerModule.setup('api/auth', app, authDocument);

  const usuarioDocument = SwaggerModule.createDocument(app, options, {
    include: [UsuarioModule],
  });
  SwaggerModule.setup('api/usuario', app, usuarioDocument);

  const empresaDocument = SwaggerModule.createDocument(app, options, {
    include: [EmpresaModule],
  });
  SwaggerModule.setup('api/empresa', app, empresaDocument);

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3333);
}
bootstrap();
