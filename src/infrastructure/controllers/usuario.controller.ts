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
import { CreateUseCase } from '../../application/use-case/create.use-case';
import { DeleteUseCase } from '../../application/use-case/delete.use-case';
import { FindUseCase } from '../../application/use-case/find.use-case';
import { UpdateUseCase } from '../../application/use-case/update.use-case';
import { Usuario } from '../database/models/usuario.model';
import { UsuarioRepository } from '../database/repositories/usuario.repository';
import { UsuarioDTO } from '../dto/usuario.dto';

@Controller()
export class UsuarioController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  @Get()
  find(): Observable<Usuario[]> {
    const useCase = new FindUseCase(this.usuarioRepository);
    return useCase.execute();
  }

  @Post()
  create(@Body() user: UsuarioDTO): Observable<Usuario> {
    const useCase = new CreateUseCase(this.usuarioRepository);
    return useCase.execute(user);
  }

  @Put(':id')
  update(@Param() id: string, @Body() user: UsuarioDTO) {
    const useCase = new UpdateUseCase(this.usuarioRepository);
    return useCase.execute(id, user);
  }

  @Delete(':id')
  delete(@Param() id: string) {
    const useCase = new DeleteUseCase(this.usuarioRepository);
    return useCase.execute(id);
  }
}
