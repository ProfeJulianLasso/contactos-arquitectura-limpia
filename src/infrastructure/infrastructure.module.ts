import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from './controllers/usuario.controller';
import { Usuario, UsuarioSchema } from './database/models/usuario.model';
import { UsuarioRepository } from './database/repositories/usuario.repository';
import { MongoServerErrorExceptionFilter } from './exception-filters/mongo-server-error.exception-filter';
import { RickAndMortyService } from './services/rick-and-morty.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost/contactos'),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioRepository,
    RickAndMortyService,
    {
      provide: APP_FILTER,
      useClass: MongoServerErrorExceptionFilter,
    },
  ],
})
export class InfrastructureModule {}
