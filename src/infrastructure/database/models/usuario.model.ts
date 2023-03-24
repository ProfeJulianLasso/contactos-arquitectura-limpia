import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UsuarioDomain } from '../../../domain/models/usuario.model';

@Schema({ collection: 'usuarios', versionKey: false })
export class Usuario extends UsuarioDomain {
  @Prop({ required: true, unique: true })
  nombre: string;
}

export type UsuarioDocument = HydratedDocument<Usuario>;
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
