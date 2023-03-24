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
import { UserDelegator } from 'src/application/delegators/user.delegator';
import { Usuario } from '../database/models/usuario.model';
import { UsuarioRepository } from '../database/repositories/usuario.repository';
import { UsuarioDTO } from '../dto/usuario.dto';

@Controller()
export class UsuarioAPI {
  private readonly userDelegate: UserDelegator;
  constructor(private readonly usuarioRepository: UsuarioRepository) {
    this.userDelegate = new UserDelegator(this.usuarioRepository);
  }

  @Get()
  find(): Observable<Usuario[]> {
    return this.userDelegate.findUsers();
  }

  @Post()
  create(@Body() user: UsuarioDTO): Observable<Usuario> {
    return this.userDelegate.createUser(user);
  }

  @Put(':id')
  update(@Param() id: string, @Body() user: UsuarioDTO): Observable<Usuario> {
    return this.userDelegate.updateUser(id, user);
  }

  @Delete(':id')
  delete(@Param() id: string): Observable<boolean> {
    return this.userDelegate.deleteUser(id);
  }
}
