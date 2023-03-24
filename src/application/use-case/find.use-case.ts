import { Observable } from 'rxjs';
import { UsuarioDomain } from '../../domain/models/usuario.model';
import { IUserRepository } from '../../domain/repositories/usuario.repository';
import { IUseCase } from './interface/use-case.interface';

export class FindUseCase implements IUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(): Observable<UsuarioDomain[]> {
    return this.userRepository.find();
  }
}
