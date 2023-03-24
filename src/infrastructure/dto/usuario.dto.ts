import { IsNotEmpty, IsString } from 'class-validator';
import { UsuarioDomain } from '../../domain/models/usuario.model';

export class UsuarioDTO extends UsuarioDomain {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
