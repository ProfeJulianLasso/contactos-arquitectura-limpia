import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { catchError, from, map, Observable } from 'rxjs';
import { IUserRepository } from '../../../domain/repositories/usuario.repository';
import { Usuario, UsuarioDocument } from '../models/usuario.model';

@Injectable()
export class UsuarioRepository implements IUserRepository<Usuario> {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioRepository: Model<UsuarioDocument>,
  ) {}

  find(): Observable<Usuario[]> {
    return from(this.usuarioRepository.find()).pipe(
      map((usuarios: UsuarioDocument[]) => {
        return usuarios;
      }),
    );
  }

  create(model: Usuario): Observable<Usuario> {
    return from(this.usuarioRepository.create(model));
  }

  update(id: string, model: Usuario): Observable<Usuario> {
    const _id = new Types.ObjectId(id);
    return from(
      this.usuarioRepository.findByIdAndUpdate(_id, model, { new: true }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
      map((usuario: UsuarioDocument) => {
        if (!usuario) throw new NotFoundException('Usuario no encontrado');
        return usuario;
      }),
    );
  }

  delete(id: string): Observable<boolean> {
    const _id = new Types.ObjectId(id);
    return from(this.usuarioRepository.findByIdAndDelete(_id)).pipe(
      catchError((error) => {
        throw error;
      }),
      map((usuario) => {
        if (!usuario) throw new NotFoundException('Usuario no encontrado');
        return true;
      }),
    );
  }
}
