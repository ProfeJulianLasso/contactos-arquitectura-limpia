import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDelegate } from '../../application/delegates/user.delegate';
import { Usuario } from '../database/models/usuario.model';
import { UsuarioRepository } from '../database/repositories/usuario.repository';
import { UsuarioDTO } from '../dto/usuario.dto';

@Controller()
export class UsuarioAPI {
  private readonly useCase: UserDelegate;

  constructor(private readonly usuarioRepository: UsuarioRepository) {
    this.useCase = new UserDelegate(this.usuarioRepository);
  }

  @Get()
  find(): Observable<Usuario[]> {
    this.useCase.toFindUsers();
    return this.useCase.execute();
  }

  @Post()
  create(@Body() user: UsuarioDTO): Observable<Usuario> {
    this.useCase.toCreateUser();
    return this.useCase.execute(user);
  }

  @Put(':id')
  update(@Param() id: string, @Body() user: UsuarioDTO): Observable<Usuario> {
    this.useCase.toUpdateUser();
    return this.useCase.execute(id, user);
  }

  @Delete(':id')
  delete(@Param() id: string): Observable<boolean> {
    this.useCase.toDeleteUser();
    return this.useCase.execute(id);
  }
}
