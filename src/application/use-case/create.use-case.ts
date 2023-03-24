import { Observable } from 'rxjs';
import { UsuarioDomain } from '../../domain/models/usuario.model';
import { IUserRepository } from '../../domain/repositories/usuario.repository';

export class CreateUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(user: UsuarioDomain): Observable<UsuarioDomain> {
    return this.userRepository.create(user);
  }
}
