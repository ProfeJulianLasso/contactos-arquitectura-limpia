import { Observable } from 'rxjs';
import { IUserRepository } from '../../domain/repositories/usuario.repository';
import { IUseCase } from './interface/use-case.interface';

export class DeleteUseCase implements IUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: string): Observable<boolean> {
    return this.userRepository.delete(id);
  }
}
