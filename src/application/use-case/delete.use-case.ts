import { IUserRepository } from '../../domain/repositories/usuario.repository';

export class DeleteUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: string) {
    return this.userRepository.delete(id);
  }
}
