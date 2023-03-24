import { IUserRepository } from '../../domain/repositories/usuario.repository';
import { UsuarioDomain } from '../../domain/models/usuario.model';

export class UpdateUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: string, user: UsuarioDomain) {
    return this.userRepository.update(id, user);
  }
}
