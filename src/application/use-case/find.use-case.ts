import { Observable } from 'rxjs';
import { UsuarioDomain } from '../../domain/models/usuario.model';
import { IUserRepository } from '../../domain/repositories/usuario.repository';

export class FindUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(): Observable<UsuarioDomain[]> {
    return this.userRepository.find();
  }
}
